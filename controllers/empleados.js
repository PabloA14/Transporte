import Empleado from "../models/empleados.js"


const httpEmpleados = {
    getEmpleados: async (req, res) => {
        const empleado = await Empleado.find()
        res.json({ empleado })
    },

    postEmpleado: async (req, res) => {
        const { cedula, nombre, telefono, username, clave } = req.body
        const empleado = await Empleado({ cedula, nombre, telefono, username, clave })
        await empleado.save()
        res.json({empleado})
    },

    

    

}

export default httpEmpleados