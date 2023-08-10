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
        const { codigoRuta, nombre, origen, destino, valor, hora_salida } = req.body
        const ruta = await Ruta({ codigoRuta, nombre, origen, destino, valor, hora_salida })
        await ruta.save()
        res.json({ ruta })
    },

    putRuta: async (req, res) => {
        const rutaId = req.params.id;
        const newData = req.body;

        try {
            const rutaExistente = await Ruta.findById(rutaId);
            if (!rutaExistente) {
                return res.status(404).json({ mensaje: 'No se encontró la ruta con el ID proporcionado.' });
            }

            await Ruta.findByIdAndUpdate(rutaId, newData);

            const rutaActualizada = await Ruta.findById(rutaId);
            res.json({ ruta: rutaActualizada });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar la ruta.' });
        }
    },

    patchRuta: async (req, res) => {
        const id = req.params.id
        const { estado } = req.body

        try {
            const ruta = await Ruta.findById(id)

            if (ruta) {
                ruta.estado = estado
                await ruta.save()
                res.json(ruta)

            } else {
                console.log("Id no encontrado");
            }

        } catch (error) {
            console.error(error);
        }
    }

}

export default httpRutas