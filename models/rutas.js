import mongoose from "mongoose";

const rutasSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    origen: { type: String, required: true },
    destino: { type: String, required: true },
    valor_pasage: { type: Number, required: true, default: 0 },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Ruta", rutasSchema)

// guet

// guet para todas las rutas
// guet para enlistar una ruta


// post

// post para registrar una ruta


// put

// put para actualizar el estado de una ruta

