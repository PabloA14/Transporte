import Pasajero from "../models/pasajeros.js"

const httpPasajeros = {

    getPasajeros: async (req, res) => {
        const pasajero = await Pasajero.find()
        res.json({ pasajero })
    },

    getCedula: async (req, res) => {
        try {
            const cedulaBuscada = req.params.cedula;
            // Realiza la búsqueda del pasajero en la base de datos utilizando el modelo
            const pasajeroEncontrado = await Pasajero.findOne({ cedula: cedulaBuscada });
            if (!pasajeroEncontrado) {
                // Si no se encontró el pasajero con la cédula dada, devolver un mensaje de error o un estado 404 Not Found.
                return res.status(404).json({ mensaje: 'No se encontró el pasajero con la cédula proporcionada.' });
            }
            // Si se encontró el pasajero, devuelve la información del mismo en la respuesta.
            res.json(pasajeroEncontrado);
        } catch (error) {
            // Manejo de errores en caso de que algo falle.
            console.error('Error al buscar el pasajero:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar el pasajero.' });
        }
    },

    postPasajero: async (req, res) => {
        const { cedula, nombre, telefono } = req.body
        const pasajero = await Pasajero({ cedula, nombre, telefono })
        await pasajero.save()
        res.json({ pasajero })
    },
    putPasajero: async (req, res) => {
        const pasajeroId = req.params.id;
        const newData = req.body;

        try {
            const pasajeroExistente = await Pasajero.findById(pasajeroId);
            if (!pasajeroExistente) {
                return res.status(404).json({ mensaje: 'No se encontró el pasajero con el ID proporcionado.' });
            }

            await Pasajero.findByIdAndUpdate(pasajeroId, newData);

            const pasajeroActualizado = await Pasajero.findById(pasajeroId);
            res.json({ pasajero: pasajeroActualizado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el pasajero.' });
        }
    },
    patchPasajero: async (req, res) => {
        const id = req.params.id
        const { estado } = req.body

        try {
            const pasajero = await Pasajero.findById(id)

            if (pasajero) {
                pasajero.estado = estado
                await pasajero.save()
                res.json(pasajero)

            } else {
                console.log("Id no encontrado");
            }

        } catch (error) {
            console.error(error);
        }
    }
}

export default httpPasajeros