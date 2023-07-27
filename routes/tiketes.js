import httpTiketes from "../controllers/tiketes.js"
import { Router } from "express"
import { check } from "express-validator"

const router = Router()

router.get("/", httpTiketes.getTiketes)

router.post("/",[
    check("veiculo_matericula", "La matricula del vehiculo es obligatorio").notEmpty().isString()

], httpRutas.postRuta)

export default router