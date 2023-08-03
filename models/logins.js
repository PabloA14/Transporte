import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    usuario: { type: String, required: true },
    clave: { type: String, required: true }
})

export default mongoose.model("Login", loginSchema)