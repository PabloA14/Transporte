import httpPasajeros from "../controllers/pasajeros.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

const router = Router()

router.get("/", httpPasajeros.getPasajeros)

router.post("/", [
    check("cedula", "La cédula es obligatoria").trim().not().isEmpty(),
    check("cedula", "Cédula de máximo 10 caracteres").trim().isLength({ max: 10 }),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("telefono", "El telefono es obligatorio").trim().not().isEmpty(),
    check("telefono", "Teléfono de máximo 12 caracteres").trim().isLength({ max: 12 }),
    validarCampos
], httpPasajeros.postPasajero)

router.get("/:cedula", httpPasajeros.getCedula);

router.put('/:id', [
    check("cedula", "La cédula es obligatoria").trim().not().isEmpty(),
    check("cedula", "Cédula de máximo 10 caracteres").trim().isLength({ max: 10 }),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("telefono", "El telefono es obligatorio").trim().not().isEmpty(),
    check("telefono", "Teléfono de máximo 12 caracteres").trim().isLength({ max: 12 }),
    validarCampos
], httpPasajeros.putPasajero);

router.patch('/:id', httpPasajeros.patchPasajero)



export default router