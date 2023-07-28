import mongoose from "mongoose";

const pasajeroSchema = new mongoose.Schema({
    cedula: { type: String, required: true },
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    estado: { type: Number, default: 1,required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Pasajero", pasajeroSchema)