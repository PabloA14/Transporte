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
        const { matricula, numero, chofer_id, tipo, marca, modelo, capacidad } = req.body

        try {
            const vehiculoExistente = await Vehiculo.findOne({ matricula })

            if (vehiculoExistente) {
                return res.status(400).json({ mensaje: 'La matrícula ya está registrada.' });
            }

            const numeroExistente = await Vehiculo.findOne({ numero })

            if (numeroExistente) {
                return res.status(400).json({ mensaje: 'El número ya está registrado.' });
            }

            const vehiculo = new Vehiculo({ matricula, numero, chofer_id, tipo, marca, modelo, capacidad })
            await vehiculo.save()
            res.json({ vehiculo })
        } catch (error) {
            console.error('Error al agregar el vehículo:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar el vehículo.' });
        }

    },
    putVehiculo: async (req, res) => {
        const vehiculoId = req.params.id;
        const newData = req.body;

        try {
            const vehiculoExistente = await Vehiculo.findOne({ matricula: newData.matricula });

            if (vehiculoExistente && vehiculoExistente._id.toString() !== vehiculoId) {
                return res.status(400).json({ mensaje: 'La matrícula ya está registrada.' });
            }

            const numeroExistente = await Vehiculo.findOne({ numero: newData.numero });

            if (numeroExistente && numeroExistente._id.toString() !== vehiculoId) {
                return res.status(400).json({ mensaje: 'El número ya está registrado.' });
            }

            const vehiculoEncontrado = await Vehiculo.findById(vehiculoId);
            if (!vehiculoEncontrado) {
                return res.status(404).json({ mensaje: 'No se encontró el vehículo con el ID proporcionado.' });
            }

            await Vehiculo.findByIdAndUpdate(vehiculoId, newData);

            const vehiculoActualizado = await Vehiculo.findById(vehiculoId);
            res.json({ vehiculo: vehiculoActualizado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el vehículo.' });
        }
    },
    patchVehiculo: async (req, res) => {
        const id = req.params.id
        const { estado } = req.body

        try {
            const vehiculo = await Vehiculo.findById(id)

            if (vehiculo) {
                vehiculo.estado = estado
                await vehiculo.save()
                res.json(vehiculo)
            } else {
                console.log("Id no encontrado");
            }

        } catch (error) {
            console.error(error);
        }
    }
}

export default httpVehiculos