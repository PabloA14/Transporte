import Vehiculo from "../models/vehiculos.js";

const httpVehiculos = {

    getVehiculos: async (req, res) => {
        const vehiculo = await Vehiculo.find()
        res.json({ vehiculo })
    },

    postVehiculo: async (req, res) => {
        const { matricula, chofer_nombre, tipo, marca, modelo, capacidad } = req.body
        const vehiculo = await Vehiculo({ matricula, chofer_nombre, tipo, marca, modelo, capacidad })
        await vehiculo.save()
        res.json({ vehiculo })
    }

}

export default httpVehiculos