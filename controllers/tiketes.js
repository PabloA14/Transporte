import Tikete from "../models/tiketes.js"

const httpTiketes = {

    getTiketes: async (req, res) => {
        const tikete = await Tikete.find()
        res.json({ tikete })
    },

    getTikete: async (req, res) => {
        try {
            consttiketeBuscada = req.params.ruta;
            consttiketeEncontrado = await Tikete.findOne({ nombre:tiketeBuscada });
            if (!rutaEncontrado) {
                return res.status(404).json({ mensaje: 'No se encontró eltikete con la cédula proporcionada.' });
            }
            res.json(rutaEncontrado);
        } catch (error) {
            console.error('Error al buscar eltikete:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar eltikete.' });
        }
    },

    postTikete: async (req, res) => {
        const { id, veiculo_matericula, cedula_empleado, cedula_pasagero, num_acientos, fecha_salida, hora_salida, tipo_pago, ruta } = req.body
        const tikete = await Tikete({ id, veiculo_matericula, cedula_empleado, cedula_pasagero, num_acientos, fecha_salida, hora_salida, tipo_pago, ruta })
        await tikete.save()
        res.json({tikete})
    }

}

export default httpTiketes