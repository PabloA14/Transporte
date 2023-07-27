import Ruta from "../models/rutas.js"

const httpRutas = {
    getRutas: async (req, res) => {
        const ruta = await Ruta.find()
        res.json({ ruta })
    },
    postRuta: async (req, res) => {
        const { origen, destino, valor_pasage } = req.body
        const ruta = await Ruta({ origen, destino, valor_pasage })
        await ruta.save()
        res.json({ruta})
    }

}

export default httpRutas