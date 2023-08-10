import Tikete from "../models/tiketes.js"

const httpTiketes = {

    getTiketes: async (req, res) => {
        const tikete = await Tikete.find()
            .populate("cedula_pasajero")
            .populate("empleado")
            .populate("vehiculo_matricula")
            .populate("ruta")
            
        res.json({ tikete })
    },

    getnumero: async (req, res) => {
        try {
            const tiketeBuscada = req.params.numero;
            const tiketeEncontrado = await Tikete.findOne({ numero: tiketeBuscada });
            if (!tiketeEncontrado) {
                return res.status(404).json({ mensaje: 'No se encontró el tikete con el numero proporcionada.' });
            }
            res.json(tiketeEncontrado);
        } catch (error) {
            console.error('Error al buscar eltikete:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar eltikete.' })
        }
    },

    postTikete: async (req, res) => {
        const { numero, vehiculo_matricula, empleado, cedula_pasajero, num_acientos, fecha_salida, hora_salida, tipo_pago, ruta, estado } = req.body
        const tikete = await Tikete({ numero, vehiculo_matricula, empleado, cedula_pasajero, num_acientos, fecha_salida, hora_salida, tipo_pago, ruta, estado })
        await tikete.save()
        res.json({ tikete })
    },

    puttikete: async (req, res) => {
        const tiketeId = req.params.id;
        const newData = req.body;

        try {
            const tiketeExistente = await Tikete.findById(tiketeId);
            if (!tiketeExistente) {
                return res.status(404).json({ mensaje: 'No se encontró el tikete con el ID proporcionado' });
            }

            await Tikete.findByIdAndUpdate(tiketeId, newData);

            const pasajeroActualizado = await Tikete.findById(tiketeId);
            res.json({ pasajero: pasajeroActualizado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar tikete' });
        }
    }

}

export default httpTiketes