import mongoose from "mongoose";

const rutasSchema = new mongoose.Schema({
    origen: { type: String, required: true },
    destino: { type: String, required: true },
    valor_pasage: { type: Number, required: true, default: 0 },
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

