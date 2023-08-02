import Vehiculo from "../models/vehiculos.js";

const httpVehiculos = {

    getVehiculos: async (req, res) => {
        const vehiculo = await Vehiculo.find().populate("chofer_id")
        res.json({ vehiculo })
    },

    getMatricula: async (req, res) => {
        try {
            const matriculaBuscada = req.params.matricula;
            // Realiza la búsqueda del vehiculo en la base de datos utilizando el modelo
            const vehiculoEncontrado = await Vehiculo.findOne({ matricula: matriculaBuscada });
            if (!vehiculoEncontrado) {
                // Si no se encontró el vehiculo con la cédula dada, devolver un mensaje de error o un estado 404 Not Found.
                return res.status(404).json({ mensaje: 'No se encontró el vehiculo con la matrícula proporcionada.' });
            }
            // Si se encontró el vehiculo, devuelve la información del mismo en la respuesta.
            res.json(vehiculoEncontrado);
        } catch (error) {
            // Manejo de errores en caso de que algo falle.
            console.error('Error al buscar el vehiculo:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar el vehiculo.' });
        }
    },

    postVehiculo: async (req, res) => {
        const { matricula, chofer_id, tipo, marca, modelo, capacidad, estado } = req.body
        const vehiculo = await Vehiculo({ matricula, chofer_id, tipo, marca, modelo, capacidad, estado })
        await vehiculo.save()
        res.json({ vehiculo })
    }

}

export default httpVehiculos