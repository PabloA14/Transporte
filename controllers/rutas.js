import Ruta from "../models/rutas.js"

const httpRutas = {
    getRutas: async (req, res) => {
        const ruta = await Ruta.find()
        res.json({ ruta })
    },
    getNombreRuta: async (req, res) => {
        try {
            const nombreBuscado = req.params.nombre;
            const rutaEncontrada = await Ruta.findOne({ nombre: nombreBuscado });
            if (!rutaEncontrada) {
                return res.status(404).json({ mensaje: 'No se encontró la ruta con el nombre proporcionada.' });
            }
            res.json(rutaEncontrada);
        } catch (error) {
            console.error('Error al buscar el chofer:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar la ruta.' });
        }
    },
    postRuta: async (req, res) => {
        const { nombre, origen, destino, valor } = req.body
        const ruta = await Ruta({ nombre, origen, destino, valor })
        await ruta.save()
        res.json({ ruta })
    }

}

export default httpRutas