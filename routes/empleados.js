import httpEmpleados from "../controllers/empleados.js";
import { Router } from "express";
import { check } from "express-validator"

const router = Router()

router.get("/", httpEmpleados.getEmpleados)

router.post("/", [
    check("cedula", "la cédula es obligatoria").notEmpty().isString().trim(),
    check("cedula", "cedula máximo 10 caracteres").isLength({ max: 10 }).trim(),
    check("nombre", "el nombre es obligatorio").notEmpty().trim(),
    check("telefono", "el telefono es obligatorio").notEmpty().trim(),
    check("telefono", "telefono de máximo 12 caracteres").isLength({ max: 12 }),
    check("username", "el nombre de usuario es obligatorio").notEmpty().trim(),
    check("clave", "la clave es obligatoria").notEmpty().trim()
], httpEmpleados.postEmpleado)

router.get("/:cedula", httpEmpleados.getCedula);


export default router