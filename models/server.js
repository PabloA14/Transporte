import express from "express"
import choferes from "../routes/choferes.js"
import empleados from "../routes/empleados.js"
import pasajeros from "../routes/pasajeros.js"
import rutas from "../routes/rutas.js"
import vehiculos from "../routes/vehiculos.js"
import tiketes from "../routes/rutas.js"
import mongoose from "mongoose"
import cors from "cors"





class Server {
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
    }

    routes() {
        this.app.use('/api/pasajeros', pasajeros)
        this.app.use('/api/empleados', empleados)
        this.app.use('/api/choferes', choferes)
        this.app.use('/api/vehiculos', vehiculos)
        this.app.use('/api/rutas', rutas)
        this.app.use('/api/rutas', tiketes)
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(cors())
    }
    escuchar() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        })
    }
}

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('Connected!'));

export default Server