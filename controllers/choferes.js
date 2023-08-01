import Chofer from "../models/choferes.js";

const httpChoferes = {
    getChoferes: async (req, res) => {
        const chofer = await Chofer.find();
        res.json({ chofer });
    },

    postChofer: async (req, res) => {
        const { cedula, nombre, telefono, numero_licencia, categoria_licencia, fecha_vencimiento, experiencia } = req.body;
        const chofer = await Chofer({ cedula, nombre, telefono, numero_licencia, categoria_licencia, fecha_vencimiento, experiencia });
        await chofer.save();
        res.json({ chofer });
    },

    getCedulaChofer: async (req, res) => {
        try {
            const cedulaBuscada = req.params.cedula;
            const choferEncontrado = await Chofer.findOne({ cedula: cedulaBuscada });
            if (!choferEncontrado) {
                return res.status(404).json({ mensaje: 'No se encontró el chofer con la cédula proporcionada.' });
            }
            res.json(choferEncontrado);
        } catch (error) {
            console.error('Error al buscar el chofer:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar el chofer.' });
        }
    },
    putChofer: async (req, res) => {
        const choferId = req.params.id;
        const newData = req.body;

        try {
            const choferExistente = await Chofer.findById(choferId);
            if (!choferExistente) {
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
};

export default httpChoferes;
