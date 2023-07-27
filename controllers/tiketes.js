import tiketes from "../models/tiketes.js"
import Tikete from "../models/tiketes.js"

const httpTiketes = {

    getTiketes: async (req, res) => {
        const tikete = await tiketes.find()
        res.json({ tikete })
    },

    postTikete: async (req, res) => {
        const { veiculo_matericula, cedula_empleado, cedula_pasagero, num_acientos, fecha_salida, hora_salida, tipo_pago, ruta } = req.body
        const tikete = await Tikete({ veiculo_matericula, cedula_empleado, cedula_pasagero, num_acientos, fecha_salida, hora_salida, tipo_pago, ruta })
        await tikete.save()
        res.json({tikete})
    }

}

export default httpTiketes