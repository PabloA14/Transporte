import mongoose from "mongoose";

const vehiculoSchema = new mongoose.Schema({
    matricula: { type: String, required: true},
    chofer_nombre: { type: mongoose.Schema.Types.String, ref: 'Chofer'},
    tipo: { type: String, required: false },
    marca: { type: String, required: false },
    modelo: { type: String, required: false },
    capacidad: { type: Number, required: true },
    estado: { type: Number, default: 1},
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Vehiculo", vehiculoSchema)

// get

// get para mostrar todos los vehiculos
// get para buscar 1 vehicilo


// post 

// post para registrar un vehiculo 


