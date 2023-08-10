import httpChoferes from "../controllers/choferes.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

const router = Router()

router.get("/", httpChoferes.getChoferes)
router.get("/:cedula", httpChoferes.getCedulaChofer)

router.post("/", [
    check("cedula", "La cédula es obligatoria").trim().not().isEmpty(),
    check("cedula", "Cédula máximo 10 caracteres").trim().isLength({ max: 10 }),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("telefono", "El teléfono es obligatorio").trim().not().isEmpty(),
    check("telefono", "Teléfono de máximo 12 caracteres").trim().isLength({ max: 12 }),
    check("numero_licencia", "El número de licencia es obligatorio").trim().not().isEmpty(),
    check("categoria_licencia", "La categoria de la licencia es obligatoria").trim().not().isEmpty(),
    check("fecha_vencimiento", "La fecha de vencimiento es obligatoria").trim().not().isEmpty(),
    check("experiencia", "Los años de experiencia son obligatorios").trim().not().isEmpty(),
    validarCampos
], httpChoferes.postChofer)

router.put('/:id', [
    check("cedula", "La cédula es obligatoria").trim().not().isEmpty(),
    check("cedula", "Cédula máximo 10 caracteres").trim().isLength({ max: 10 }),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("telefono", "El teléfono es obligatorio").trim().not().isEmpty(),
    check("telefono", "Teléfono de máximo 12 caracteres").trim().isLength({ max: 12 }),
    check("numero_licencia", "El número de licencia es obligatorio").trim().not().isEmpty(),
    check("categoria_licencia", "La categoria de la licencia es obligatoria").trim().not().isEmpty(),
    check("fecha_vencimiento", "La fecha de vencimiento es obligatoria").trim().not().isEmpty(),
    check("experiencia", "Los años de experiencia son obligatorios").trim().not().isEmpty(),
    validarCampos
], httpChoferes.putChofer);

router.patch('/:id', httpChoferes.patchChofer) //patch


export default router