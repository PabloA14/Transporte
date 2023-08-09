import mongoose from "mongoose";

const rutasSchema = new mongoose.Schema({
    codigoRuta: { type: String, required: true },
    nombre: { type: String, required: true },
    origen: { type: String, required: true },
    destino: { type: String, required: true },
    valor: { type: Number, required: true, default: 0 },
    fecha_salida: { type: Date, required: true },
    hora_salida: { type: String, required: true },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Ruta", rutasSchema)

