import httpRutas from "../controllers/rutas.js"
import { Router } from "express";
import { check } from "express-validator"

const router = Router()

router.get("/", httpRutas.getRutas)
router.get("/:ruta", httpRutas.getRuta);

router.post("/",[
    check("nombre", "el nombre es obligatorio").notEmpty().isString().trim(),
    check("origen", "el origen es obligatorio").notEmpty().isString().trim(),
    check("destino", "el destino es obligatorio").notEmpty().trim(),
    check("valor", "el valor es obligatorio").notEmpty().trim(),
], httpRutas.postRuta)

export default router