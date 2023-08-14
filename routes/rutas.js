import httpRutas from "../controllers/rutas.js"
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

const router = Router()

router.get("/", httpRutas.getRutas)

router.post("/", [
    check("codigoRuta", "El codigoRuta es obligatorio").trim().not().isEmpty(),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("origen", "El origen es obligatorio").trim().not().isEmpty(),
    check("destino", "El destino es obligatorio").trim().not().isEmpty(),
    check("valor", "El valor es obligatorio").trim().not().isEmpty(),
    check("hora_salida", "La hora es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpRutas.postRuta)

router.get("/:nombre", httpRutas.getNombreRuta);



router.put('/:id', [
    check("codigoRuta", "el codigoRuta es obligatorio").trim().not().isEmpty(),
    check("nombre", "el nombre es obligatorio").trim().not().isEmpty(),
    check("origen", "el origen es obligatorio").trim().not().isEmpty(),
    check("destino", "el destino es obligatorio").trim().not().isEmpty(),
    check("valor", "el valor es obligatorio").trim().not().isEmpty(),
    check("hora_salida", "La hora es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpRutas.putRuta);


router.patch('/:id', httpRutas.patchRuta);



export default router