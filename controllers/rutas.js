import Ruta from "../models/rutas.js"

const httpRutas = {
    getRutas: async (req, res) => {
        const ruta = await Ruta.find()
        res.json({ ruta })
    },


    getRuta: async (req, res) => {
        try {
            const rutaBuscada = req.params.ruta;
            const rutaEncontrado = await Ruta.findOne({ nombre: rutaBuscada });
            if (!rutaEncontrado) {
                return res.status(404).json({ mensaje: 'No se encontró el ruta con la cédula proporcionada.' });
            }
            res.json(rutaEncontrado);
        } catch (error) {
            console.error('Error al buscar el ruta:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar el ruta.' });
        }
    },

    postRuta: async (req, res) => {
        const { nombre, origen, destino, valor_pasage } = req.body
        const ruta = await Ruta({ nombre, origen, destino, valor_pasage })
        await ruta.save()
        res.json({ ruta })
    }

}

export default httpRutas