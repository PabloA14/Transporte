import mongoose from "mongoose";

const tiketeSchema = new mongoose.Schema({
    numero: { type: String, required: false },
    vehiculo_matricula: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehiculo', required: true },
    empleado: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
    cedula_pasajero: { type: mongoose.Schema.Types.ObjectId, ref: 'Pasajero', required: true },
    num_acientos: { type: Number, default: 0 },
    fecha_salida: { type: Date, required: true },
    hora_salida: { type: mongoose.Schema.Types.ObjectId, ref: 'Ruta', required: true },
    tipo_pago: { type: String, required: false },
    ruta: { type: mongoose.Schema.Types.ObjectId, ref: 'Ruta', required: true },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Tikete", tiketeSchema)
