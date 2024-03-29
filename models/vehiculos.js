import mongoose from "mongoose";

const vehiculoSchema = new mongoose.Schema({
    matricula: { type: String, required: true },
    numero: { type: String, required: true },
    chofer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chofer' },
    tipo: { type: String, required: false },
    marca: { type: String, required: false },
    modelo: { type: String, required: false },
    capacidad: { type: Number, required: true },
    estado: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Vehiculo", vehiculoSchema)