import Chofer from "../models/choferes.js"

const httpChoferes = {
    getChoferes: async (req, res) => {
        const chofer = await Chofer.find()
        res.json({ chofer })
    },

    postChofer: async (req, res) => {
        const { cedula, nombre, telefono, numero_licencia, categoria_licencia, fecha_vencimiento, experiencia } = req.body
        const chofer = await Chofer({ cedula, nombre, telefono, numero_licencia, categoria_licencia, fecha_vencimiento, experiencia })
        await chofer.save()
        res.json({ chofer })
    },
    getCedulaChofer: async (req, res) => {
        try {
            const cedulaBuscada = req.params.cedula;
            const pasajeroEncontrado = await Chofer.findOne({ cedula: cedulaBuscada });
            if (!pasajeroEncontrado) {
                return res.status(404).json({ mensaje: 'No se encontró el pasajero con la cédula proporcionada.' });
            }
            res.json(pasajeroEncontrado);
        } catch (error) {
            console.error('Error al buscar el pasajero:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar el pasajero.' });
        }
    },

}

export default httpChoferes