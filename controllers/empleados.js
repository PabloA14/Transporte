import Empleado from "../models/empleados.js"


const httpEmpleados = {
    getEmpleados: async (req, res) => {
        const empleado = await Empleado.find()
        res.json({ empleado })
    },

    getCedula: async (req, res) => {
        try {
            const cedulaBuscada = req.params.cedula;
            // Realiza la búsqueda del pasajero en la base de datos utilizando el modelo
            const empleadoEncontrado = await Empleado.findOne({ cedula: cedulaBuscada });
            if (!empleadoEncontrado) {
                // Si no se encontró el empleado con la cédula dada, devolver un mensaje de error o un estado 404 Not Found.
                return res.status(404).json({ mensaje: 'No se encontró el empleado con la cédula proporcionada.' });
            }
            // Si se encontró el empleado, devuelve la información del mismo en la respuesta.
            res.json(empleadoEncontrado);
        } catch (error) {
            // Manejo de errores en caso de que algo falle.
            console.error('Error al buscar el empleado:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar el empleado.' });
        }
    },

    postEmpleado: async (req, res) => {
        const { cedula, nombre, telefono, username, clave } = req.body
        const empleado = await Empleado({ cedula, nombre, telefono, username, clave })
        await empleado.save()
        res.json({empleado})
    },

    

    

}

export default httpEmpleados