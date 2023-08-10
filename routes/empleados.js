import httpEmpleados from "../controllers/empleados.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

const router = Router()

router.get("/", httpEmpleados.getEmpleados)
router.get("/:cedula", httpEmpleados.getCedulaEmpleado)


router.post("/", [
    check("cedula", "la cédula es obligatoria").trim().not().isEmpty(),
    check("cedula", "cedula máximo 10 caracteres").trim().isLength({ max: 10 }),
    check("nombre", "el nombre es obligatorio").trim().not().isEmpty(),
    check("telefono", "el telefono es obligatorio").trim().not().isEmpty(),
    check("telefono", "telefono de máximo 12 caracteres").trim().isLength({ max: 12 }),
    check("username", "el nombre de usuario es obligatorio").trim().not().isEmpty(),
    check("clave", "la clave es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpEmpleados.postEmpleado)

router.put('/:id', [
    check("cedula", "la cédula es obligatoria").trim().not().isEmpty(),
    check("cedula", "cedula máximo 10 caracteres").trim().isLength({ max: 10 }),
    check("nombre", "el nombre es obligatorio").trim().not().isEmpty(),
    check("telefono", "el telefono es obligatorio").trim().not().isEmpty(),
    check("telefono", "telefono de máximo 12 caracteres").trim().isLength({ max: 12 }),
    check("username", "el nombre de usuario es obligatorio").trim().not().isEmpty(),
    check("clave", "la clave es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpEmpleados.putEmpleado);

router.patch('/:id', httpEmpleados.patchEmpleado)




export default router