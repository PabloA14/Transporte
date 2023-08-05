import Login from "../models/logins.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


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
    postSesion: async (req, res) => {
        const { usuario, clave } = req.body;

        try {
            // Buscar el usuario en la base de datos por nombre de usuario 
            const usuarioEncontrado = await Login.findOne({ usuario });

            if (!usuarioEncontrado) {
                return res.status(401).json({ mensaje: 'Credenciales inválidas' });
            }

            // Comparar la contraseña proporcionada con la contraseña hasheada de la base de datos.
            const coinciden = await bcrypt.compare(clave, usuarioEncontrado.clave);

            if (!coinciden) {
                return res.status(401).json({ mensaje: 'Credenciales inválidas' });
            }

            const token = jwt.sign(
                { usuario: usuarioEncontrado.usuario },
                process.env.CLAVE_SECRETA,
                { expiresIn: '1h' }
            );

            res.json({ token });

        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al iniciar sesión' });
        }
    },
    putLogin: async (req, res) => {
        const loginId = req.params.id;
        const newData = req.body;

        try {
            const loginExistente = await Login.findById(loginId);
            if (!loginExistente) {
                return res.status(404).json({ mensaje: 'No se encontró el usuario o clave con el ID proporcionado' });
            }

            if (newData.clave) {
                const salt = 10;
                const hashedClave = await bcrypt.hash(newData.clave, salt);
                newData.clave = hashedClave;
            }

            await Login.findByIdAndUpdate(loginId, newData);

            const loginActualizado = await Login.findById(loginId);
            res.json({ login: loginActualizado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el Usuario o contraseña' });
        }
    },
}

export default httplogin

