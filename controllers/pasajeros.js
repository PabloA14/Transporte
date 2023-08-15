import Pasajero from "../models/pasajeros.js"

const httpPasajeros = {

    getPasajeros: async (req, res) => {
        const pasajero = await Pasajero.find()
        res.json({ pasajero })
    },

    getCedula: async (req, res) => {
        try {
            const cedulaBuscada = req.params.cedula;

            const pasajeroEncontrado = await Pasajero.findOne({ cedula: cedulaBuscada });
            if (!pasajeroEncontrado) {
                return res.status(404).json({ mensaje: 'No se encontró el cliente con la cédula proporcionada.' });
            }
            res.json(pasajeroEncontrado);
        } catch (error) {
            console.error('Error al buscar el pasajero:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar el cliente.' });
        }
    },

    postPasajero: async (req, res) => {
        const { cedula, nombre, telefono } = req.body;

        try {
            const pasajeroExistente = await Pasajero.findOne({ cedula });

            if (pasajeroExistente) {
                return res.status(400).json({ mensaje: 'La cédula ya está registrada.' });
            }

            const pasajero = new Pasajero({ cedula, nombre, telefono });
            await pasajero.save();
            res.json({ pasajero });
        } catch (error) {
            console.error('Error al agregar el cliente:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar el cliente.' });
        }
    },
    putPasajero: async (req, res) => {
        const pasajeroId = req.params.id;
        const newData = req.body;

        try {
            const pasajeroExistente = await Pasajero.findOne({ cedula: newData.cedula });

            if (pasajeroExistente && pasajeroExistente._id.toString() !== pasajeroId) {
                return res.status(400).json({ mensaje: 'La cédula ya está registrada.' });
            }

            const pasajeroEncontrado = await Pasajero.findById(pasajeroId);
            if (!pasajeroEncontrado) {
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