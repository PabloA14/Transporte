import Empleado from "../models/empleados.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


const httplogin = {


    postSesion: async (req, res) => {
        const { username, clave } = req.body;

        try {
            // Buscar el usuario en la base de datos por nombre de usuario 
            const usuarioEncontrado = await Empleado.findOne({ username });
            console.log(usuarioEncontrado);

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

            res.json({token});

        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al iniciar sesión' });
        }
    }
}

export default httplogin

