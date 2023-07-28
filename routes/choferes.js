import httpChoferes from "../controllers/choferes.js";
import { Router } from "express";
import { check } from "express-validator"

const router = Router()

router.get("/", httpChoferes.getChoferes)
router.get("/:cedula", httpChoferes.getCedula)

router.post("/", [
    check("cedula", "la cédula es obligatoria").notEmpty().isString().trim(),
    check("cedula", "cedula máximo 10 caracteres").isLength({ max: 10 }).trim(),
    check("nombre", "el nombre es obligatorio").notEmpty().trim(),
    check("telefono", "el telefono es obligatorio").notEmpty().trim(),
    check("telefono", "telefono de máximo 12 caracteres").isLength({ max: 12 }),
    check("numero_licencia", "el número de licencia es obligatorio").notEmpty().trim(),
    check("categoria_licencia", "la categoria de la licencia es obligatoria").notEmpty().trim(),
    check("fecha_vencimiento", "la fecha de vencimiento es obligatoria").notEmpty().trim(),
    check("experiencia", "los años de experiencia son obligatorios").notEmpty().trim()
], httpChoferes.postChofer)

export default router