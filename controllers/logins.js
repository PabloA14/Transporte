import Login from "../models/logins.js";
import bcrypt from "bcrypt"

const httplogin = {

    getLogin: async (req, res) => {
        const login = await Login.find()
        res.json({ login })
    },

    postLogin: async (req, res) => {
        const { usuario, clave } = req.body

        const salt = 10;
        const hashedClave = await bcrypt.hash(clave, salt);

        const login = await Login({ usuario, clave: hashedClave })
        await login.save()
        res.json({ login })
    },

    putLogin: async (req, res) => {
        const loginId = req.params.id;
        const newData = req.body;

        try {
            const loginExistente = await Login.findById(loginId);
            if (!loginExistente) {
                return res.status(404).json({ mensaje: 'No se encontró el usuario o clave con el ID proporcionado' });
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

