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
            console.error('Error al buscar el empleado:', error);
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
    putEmpleado: async (req, res) => {
        const empleadoId = req.params.id; // Obtener el ID del empleado desde los parámetros de la solicitud
        const newData = req.body; // Obtener los datos actualizados desde el cuerpo de la solicitud

        try {
            // Verificar si el empleado existe en la base de datos
            const empleadoExistente = await Empleado.findById(empleadoId);
            if (!empleadoExistente) {
                return res.status(404).json({ mensaje: 'No se encontró el empleado con el ID proporcionado.' });
            }

            // Si se proporcionó una nueva contraseña, hashearla antes de actualizarla
            if (newData.clave) {
                const salt = 10;
                const hashedClave = await bcrypt.hash(newData.clave, salt);
                newData.clave = hashedClave;
            }

            // Actualizar los datos del empleado con los nuevos datos proporcionados
            await Empleado.findByIdAndUpdate(empleadoId, newData);

            // Obtener el empleado actualizado
            const empleadoActualizado = await Empleado.findById(empleadoId);
            res.json({ empleado: empleadoActualizado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el empleado.' });
        }
    },

}

export default httpEmpleados