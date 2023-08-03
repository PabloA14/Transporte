import Login from "../models/logins.js";

const httplogin = {

    getLogin: async (req, res) => {
        const login = await Login.find()
        res.json({ login })
    },

    postLogin: async (req, res) => {
        const { usuario, clave } = req.body
        const login = await Login({ usuario, clave })
        await login.save()
        res.json({ login })
    },

    putLogin: async (req, res) => {
        const loginId = req.params.id;
        const newData = req.body;

        try {
            const loginExistente = await Login.findById(loginId);
            if (!loginExistente) {
                return res.status(404).json({ mensaje: 'No se encontró el pasajero con el ID proporcionado' });
            }

            await Login.findByIdAndUpdate(loginId, newData);

            const pasajeroActualizado = await Login.findById(loginId);
            res.json({ pasajero: pasajeroActualizado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el Usuario o contraseña' });
        }
    }
}

export default httplogin

