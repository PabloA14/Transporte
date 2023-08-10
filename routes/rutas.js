import httpRutas from "../controllers/rutas.js"
import { Router } from "express";
import { check } from "express-validator"

const router = Router()

router.get("/", httpRutas.getRutas)

router.post("/", [
    check("nombre", "el nombre es obligatorio").notEmpty().isString().trim(),
    check("origen", "el origen es obligatorio").notEmpty().isString().trim(),
    check("destino", "el destino es obligatorio").notEmpty().trim(),
    check("valor", "el valor es obligatorio").notEmpty().trim(),
    check("fecha_salida", "La fehca es obligatoria").notEmpty().isString().trim(),
    check("hora_salida", "La hora es obligatoria").notEmpty().isString().trim(),
], httpRutas.postRuta)

router.get("/:nombre", httpRutas.getNombreRuta);
router.put('/:id', httpRutas.putRuta);
router.patch('/:id', httpRutas.patchRuta);



export default router