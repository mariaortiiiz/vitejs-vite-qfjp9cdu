const Service = require("../models/Service");

const getServices = async (req, res) => {

    try{
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createService = async (req, res) => {
    try{
        const service = new Service(req.body);
        const saved = await service.save();
        res.json(saved);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = { getServices, createService};
