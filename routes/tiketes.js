import httpTiketes from "../controllers/tiketes.js"
import { Router } from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

const router = Router()

router.get("/", httpTiketes.getTiketes)

router.post("/", [
    check("numero", "el numero es obligatorio").trim().not().isEmpty(),
    check("num_acientos", "El dnumero de acientos es obligatorio").trim().not().isEmpty(),
    check("fecha_salida", "La fecha es obligatoria").trim().not().isEmpty(),
    check("hora_salida", "La hora es obligatoria").trim().not().isEmpty(),
    check("tipo_pago", "El tipo de pago es obligatorio").trim().not().isEmpty(),
    check("ruta", "Las ruta es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpTiketes.postTikete)

router.get("/:numero", httpTiketes.getnumero);

router.put('/:id', [
    check("numero", "el numero es obligatorio").trim().not().isEmpty(),
    check("num_acientos", "El dnumero de acientos es obligatorio").trim().not().isEmpty(),
    check("fecha_salida", "La fecha es obligatoria").trim().not().isEmpty(),
    check("hora_salida", "La hora es obligatoria").trim().not().isEmpty(),
    check("tipo_pago", "El tipo de pago es obligatorio").trim().not().isEmpty(),
    check("ruta", "Las ruta es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpTiketes.puttikete)

export default router
