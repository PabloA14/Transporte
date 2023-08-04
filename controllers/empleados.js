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
        const empleadoId = req.params.id; 
        const newData = req.body; 

        try {
            const empleadoExistente = await Empleado.findById(empleadoId);
            if (!empleadoExistente) {
                return res.status(404).json({ mensaje: 'No se encontró el empleado con el ID proporcionado.' });
            }

            if (newData.clave) {
                const salt = 10;
                const hashedClave = await bcrypt.hash(newData.clave, salt);
                newData.clave = hashedClave;
            }

            await Empleado.findByIdAndUpdate(empleadoId, newData);

            const empleadoActualizado = await Empleado.findById(empleadoId);
            res.json({ empleado: empleadoActualizado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el empleado.' });
        }
    },
    patchEmpleado: async (req, res) => {
        const id = req.params.id
        const { estado } = req.body

        try {
            const empleado = await Empleado.findById(id)

            if (empleado) {
                empleado.estado = estado
                await empleado.save()
                res.json(empleado)

            } else {
                console.log("Id no encontrado");
            }

        } catch (error) {
            console.error(error);
        }
    }

}

export default httpEmpleados