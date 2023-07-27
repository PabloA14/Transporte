import mongoose from "mongoose";

const tiketeSchema = new mongoose.Schema({
    veiculo_matericula: { type: mongoose.Schema.Types.String, ref: 'Vehiculo', required: true },
    cedula_empleado: { type: mongoose.Schema.Types.String, ref: 'Persona', required: true },
    cedula_pasagero: { type: mongoose.Schema.Types.String, ref: 'Persona', required: true },
    num_acientos: { type: Number, default: 0 },
    fecha_salida: { type: Date, required: true },
    hora_salida: { type: Date, required: true },
    tipo_pago: { type: String, required: false },
    ruta: { type: mongoose.Schema.Types.String, ref: 'Ruta', required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Tikete", tiketeSchema)

//guet

// guet parra ver todos los tikets
// guet para ver un tiket


// post

// post para generar una tiket

// put

// put para actualizar el estado de un tiket