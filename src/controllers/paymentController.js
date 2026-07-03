import PaymentMethod from "../models/PaymentMethod.js";

export const createPayment = async (req, res) => {
    try {
        const { paymentName } = req.body;

        if (!paymentName) {
            return res.status(400).json({ success: false, message: "Parment method missing!"})
        }

        const payment = await PaymentMethod.create({
            paymentName,
        });

        res.status(201).json({ 
            success: true, 
            message: "payment method created successfully!", 
            data: payment 
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export const getAllPayments = async (req, res) => {
    try {
        const payments = await PaymentMethod.findAll();
        res.status(201).json({ success: true, data: payments });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
} 


export const deletePayment = async (req, res) => {
    try {
        const id = req.params.id;

        const deletePayment = await PaymentMethod.destroy({ where: { id } });

        if (!deletePayment) {
            return res.status(401).json({ success: false, message: "Payment method not found!" });
        }

        res.status(201).json({ success: true, message: "Payment method deleted successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}



export const updatePayment = async (req, res) => {
    try {
        const { paymentName } = req.body;

        if (!paymentName) {
            return res.status(400).json({ success: false, message: "Payment name missing!"})
        }

        const id = req.params.id;

        await PaymentMethod.update(
            {
                paymentName,
            },
            { where: { id } }
        );

        const payment = await PaymentMethod.findByPk(id);

        if (!payment) {
            return res.status(400).json({ success: false, message: "Payment method not found!"});
        }

        res.status(201).json({ success: true, message: "Payment updated successfully!", data: payment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}