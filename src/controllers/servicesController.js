import Services from "../models/Services.js";

export const createService = async (req, res) => {
    try {
        const { serviceName, price } = req.body;

        if (!serviceName || !price || price < 0) {
            return res.status(400).json({ success: false, message: "service name or price missing price less than zero!"})
        }

        const service = await Services.create({
            serviceName,
            price
        });

        res.status(201).json({ 
            success: true, 
            message: "Service created successfully!", 
            data: service 
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export const getAllServices = async (req, res) => {
    try {
        const services = await Services.findAll();
        res.status(201).json({ success: true, data: services });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
} 


export const deleteService = async (req, res) => {
    try {
        const id = req.params.id;

        const deleteService = await Services.destroy({ where: { id } });

        if (!deleteService) {
            return res.status(401).json({ success: false, message: "Service not found!" });
        }

        res.status(201).json({ success: true, message: "Service deleted successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}



export const updateService = async (req, res) => {
    try {
        const { serviceName, price } = req.body;

        if (!serviceName || !price || price < 0) {
            return res.status(400).json({ success: false, message: "service name or price missing price less than zero!"})
        }

        const id = req.params.id;

        await Services.update(
            {
                serviceName,
                price,
            },
            { where: { id } }
        );

        const service = await Services.findByPk(id);

        if (!service) {
            return res.status(400).json({ success: false, message: "Service not found!"});
        }

        res.status(201).json({ success: true, message: "Service updated successfully!", data: service });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}