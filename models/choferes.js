import mongoose from "mongoose";

const choferSchema = new mongoose.Schema({
    cedula: { type: String, required: true },
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    numero_licencia: { type: String, required: true },
    categoria_licencia: { type: String, required: true },
    fecha_vencimiento: { type: String, required: true },
    experiencia: { type: String, required: true },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Chofer", choferSchema) 