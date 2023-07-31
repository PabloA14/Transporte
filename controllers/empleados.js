import Empleado from "../models/empleados.js"
import bcrypt from "bcrypt"

const httpEmpleados = {
    getEmpleados: async (req, res) => {
        const empleado = await Empleado.find()
        res.json({ empleado })
    },

    getCedulaEmpleado: async (req, res) => {
        try {
            const cedulaBuscada = req.params.cedula;
            const empleadoEncontrado = await Empleado.findOne({ cedula: cedulaBuscada });
            if (!empleadoEncontrado) {
                return res.status(404).json({ mensaje: 'No se encontró el empleado con la cédula proporcionada.' });
            }
            res.json(empleadoEncontrado);
        } catch (error) {
            console.error('Error al buscar el chofer:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar el empleado.' });
        }
    },

    postEmpleado: async (req, res) => {
        const { cedula, nombre, telefono, username, clave } = req.body;
        try {
            const salt = 10;
            const hashedClave = await bcrypt.hash(clave, salt);

            const empleado = await Empleado({ cedula, nombre, telefono, username, clave: hashedClave });
            await empleado.save();
            res.json({ empleado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el empleado' });
        }
    },


}

export default httpEmpleados