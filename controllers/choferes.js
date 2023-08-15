import Chofer from "../models/choferes.js";

const httpChoferes = {
    getChoferes: async (req, res) => {
        const chofer = await Chofer.find()
        res.json({ chofer });
    },

    postChofer: async (req, res) => {
        const { cedula, nombre, telefono, numero_licencia, categoria_licencia, fecha_vencimiento, experiencia } = req.body;

        try {
            const choferExistente = await Chofer.findOne({ cedula })

            if (choferExistente) {
                return res.status(400).json({ mensaje: 'La cédula ya está registrada.' });
            }

            const chofer = new Chofer({ cedula, nombre, telefono, numero_licencia, categoria_licencia, fecha_vencimiento, experiencia });
            await chofer.save();
            res.json({ chofer });
        }  catch (error) {
            console.error('Error al agregar el conductor:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar el conductor.' });
        }
    },

    getCedulaChofer: async (req, res) => {
        try {
            const cedulaBuscada = req.params.cedula;
            const choferEncontrado = await Chofer.findOne({ cedula: cedulaBuscada });
            if (!choferEncontrado) {
                return res.status(404).json({ mensaje: 'No se encontró el conductor con la cédula proporcionada.' });
            }
            res.json(choferEncontrado);
        } catch (error) {
            console.error('Error al buscar el chofer:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar el conductor.' });
        }
    },
    putChofer: async (req, res) => {
        const choferId = req.params.id;
        const newData = req.body;

        try {
            const choferExistente = await Chofer.findOne({ cedula: newData.cedula });

            if (choferExistente && choferExistente._id.toString() !== choferId) {
                return res.status(400).json({ mensaje: 'La cédula ya está registrada.' });
            }

            const choferEncontrado = await Chofer.findById(choferId);
            if (!choferEncontrado) {
                return res.status(404).json({ mensaje: 'No se encontró el chofer con el ID proporcionado.' });
            }

            await Chofer.findByIdAndUpdate(choferId, newData);

            const choferActualizado = await Chofer.findById(choferId);
            res.json({ chofer: choferActualizado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el chofer.' });
        }
    },
    patchChofer: async (req, res) => {
        const id = req.params.id
        const { estado } = req.body
        //patch

        try {
            const chofer = await Chofer.findById(id)

            if (chofer) {
                chofer.estado = estado
                await chofer.save()
                res.json(chofer)

            } else {
                console.log("Id no encontrado");
            }

        } catch (error) {
            console.error(error);
        }
    }
};

export default httpChoferes;
