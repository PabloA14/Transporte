import httpChoferes from "../controllers/choferes.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

const router = Router()

router.get("/", httpChoferes.getChoferes)
router.get("/:cedula", httpChoferes.getCedulaChofer)

router.post("/", [
    check("cedula", "la cédula es obligatoria").trim().not().isEmpty(),
    check("cedula", "cedula máximo 10 caracteres").trim().isLength({ max: 10 }),
    check("nombre", "el nombre es obligatorio").trim().not().isEmpty(),
    check("telefono", "el telefono es obligatorio").trim().not().isEmpty(),
    check("telefono", "telefono de máximo 12 caracteres").trim().isLength({ max: 12 }),
    check("numero_licencia", "el número de licencia es obligatorio").trim().not().isEmpty(),
    check("categoria_licencia", "la categoria de la licencia es obligatoria").trim().not().isEmpty(),
    check("fecha_vencimiento", "la fecha de vencimiento es obligatoria").trim().not().isEmpty(),
    check("experiencia", "los años de experiencia son obligatorios").trim().not().isEmpty(),
    validarCampos
], httpChoferes.postChofer)

router.put('/:id', [
    check("cedula", "la cédula es obligatoria").trim().not().isEmpty(),
    check("cedula", "cedula máximo 10 caracteres").trim().isLength({ max: 10 }),
    check("nombre", "el nombre es obligatorio").trim().not().isEmpty(),
    check("telefono", "el telefono es obligatorio").trim().not().isEmpty(),
    check("telefono", "telefono de máximo 12 caracteres").trim().isLength({ max: 12 }),
    check("numero_licencia", "el número de licencia es obligatorio").trim().not().isEmpty(),
    check("categoria_licencia", "la categoria de la licencia es obligatoria").trim().not().isEmpty(),
    check("fecha_vencimiento", "la fecha de vencimiento es obligatoria").trim().not().isEmpty(),
    check("experiencia", "los años de experiencia son obligatorios").trim().not().isEmpty(),
    validarCampos
], httpChoferes.putChofer);

router.patch('/:id', httpChoferes.patchChofer) //patch


export default router