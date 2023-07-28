import Chofer from "../models/choferes.js"

const httpChoferes = {
    getChoferes: async (req, res) => {
        const chofer = await Chofer.find().populate("chofer_id")
        res.json({ chofer })
    },

    getCedula: async (req, res) => {
        try {
            const cedulaBuscada = req.params.cedula;
            // Realiza la búsqueda del chofer en la base de datos utilizando el modelo
            const choferEncontrado = await Chofer.findOne({ cedula: cedulaBuscada });
            if (!choferEncontrado) {
                // Si no se encontró el chofer con la cédula dada, devolver un mensaje de error o un estado 404 Not Found.
                return res.status(404).json({ mensaje: 'No se encontró el chofer con la cédula proporcionada.' });
            }
            // Si se encontró el chofer, devuelve la información del mismo en la respuesta.
            res.json(choferEncontrado);
        } catch (error) {
            // Manejo de errores en caso de que algo falle.
            console.error('Error al buscar el chofer:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar el chofer.' });
        }
    },

    postChofer: async (req, res) => {
        const { cedula, nombre, telefono, numero_licencia, categoria_licencia, fecha_vencimiento, experiencia, estado } = req.body
        const chofer = await Chofer({ cedula, nombre, telefono, numero_licencia, categoria_licencia, fecha_vencimiento, experiencia, estado })
        await chofer.save()
        res.json({ chofer })
    },


}

export default httpChoferes