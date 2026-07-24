import User from "../models/Users.js";
import Service from "../models/Services.js";
import PaymentMethod from "../models/PaymentMethod.js";
import Sales from "../models/Sales.js";
import { Op, Sequelize } from "sequelize";

export const createSale = async (req, res) => {
  try {
    const { barberId, serviceId, paymentMethodId, paymentStatus, } = req.body;

    if (!barberId || !serviceId || !paymentMethodId || !paymentStatus) {
        return res.status(404).json({ message: "Missing the input" });
    }

    // Check barber
    const barber = await User.findOne({
      where: {
        id: barberId,
        role: "barber",
      },
    });

    if (!barber) {
      return res.status(404).json({
        message: "Barber not found",
      });
    }

    // Check service
    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    // Check payment method
    const payment = await PaymentMethod.findByPk(paymentMethodId);

    if (!payment) {
      return res.status(404).json({
        message: "Payment method not found",
      });
    }

    const sale = await Sales.create({
      barberId,
      serviceId,
      paymentMethodId,
      paymentStatus,
      amountPaid: service.price,
    });

    return res.status(201).json({ message: "Sale created successfully!", data: sale });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


// 2. GET Users
export const getSales = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 2,
            start,
            end,
            service,
            barber
        } = req.query;

        const offset = (page - 1) * limit;

        const where = {};

        if (start && end) {
            where.createdAt = {
                [Op.between]: [
                    new Date(start),
                    new Date(end)
                ]
            };
        }
        const sales = await Sales.findAndCountAll({
            where,
            limit: Number(limit),
            offset,
            include: [
                {
                    model: User,
                    as: "barber",
                    attributes: ["name"],
                    where: barber
                        ? {
                            name: {
                                [Op.iLike]: `%${barber}%`,
                            },
                        }
                        : undefined,
                },

                {
                    model: Service,
                    attributes: ["serviceName"],
                    where: service
                        ? {
                            serviceName: {
                                [Op.iLike]: `%${service}%`,
                            },
                        }
                        : undefined,
                },
            ],
        });

        res.json({
            data: sales.rows,
            totalSales: sales.count,
            totalPages: Math.ceil(sales.count / limit),
            currentPage: Number(page),
            limit: Number(limit),
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


// Barber report
export const reportPerBarber = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const where = {};

    if (startDate && endDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      where.createdAt = {
        [Op.between]: [start, end],
      };
    }

    const report = await Sales.findAll({
      where,

      attributes: [
        "barberId",

        [
          Sequelize.fn("SUM", Sequelize.col("amountPaid")),
          "totalIncome",
        ],

        [
          Sequelize.fn("COUNT", Sequelize.col("Sales.id")),
          "totalCustomers",
        ],
      ],

      include: [
        {
          model: User,
          as: "barber",
          attributes: ["id", "name"],
        },
      ],

      group: [
        "barberId",
        "barber.id",
      ],

      order: [
        [Sequelize.literal('"totalIncome"'), "DESC"],
      ],
    });

    return res.status(200).json({
      success: true,
      data: report,
    });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


export const dailyReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const where = {};

        if (startDate && endDate) {
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);

            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);

            where.createdAt = {
                [Op.between]: [start, end],
            };
        }

        const sales = await Sales.findAll({
            where,
        });

        const totalSales = sales.length;

        const totalIncome = sales.reduce((sum, sale)=>{
            return sum + sale.amountPaid;
        }, 0);

        res.json({
            startDate,
            endDate,
            totalSales,
            totalIncome
        });

    } catch(error){
        res.status(500).json({ success: false, message: error.message });
    }

}