import mongoose from "mongoose";

const empleadoSchema = new mongoose.Schema({
    cedula: { type: String, required: true },
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    username: { type: String, required: true },
    clave: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Empleado", empleadoSchema)