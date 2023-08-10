import httpEmpleados from "../controllers/empleados.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

const router = Router()

router.get("/", httpEmpleados.getEmpleados)
router.get("/:cedula", httpEmpleados.getCedulaEmpleado)


router.post("/", [
    check("cedula", "La cédula es obligatoria").trim().not().isEmpty(),
    check("cedula", "Cédula máximo 10 caracteres").trim().isLength({ max: 10 }),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("telefono", "El teléfono es obligatorio").trim().not().isEmpty(),
    check("telefono", "Teléfono de máximo 12 caracteres").trim().isLength({ max: 12 }),
    check("username", "El nombre de usuario es obligatorio").trim().not().isEmpty(),
    check("clave", "La clave es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpEmpleados.postEmpleado)

router.put('/:id', [
    check("cedula", "La cédula es obligatoria").trim().not().isEmpty(),
    check("cedula", "Cédula máximo 10 caracteres").trim().isLength({ max: 10 }),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("telefono", "El teléfono es obligatorio").trim().not().isEmpty(),
    check("telefono", "Teléfono de máximo 12 caracteres").trim().isLength({ max: 12 }),
    check("username", "El nombre de usuario es obligatorio").trim().not().isEmpty(),
    check("clave", "La clave es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpEmpleados.putEmpleado);

router.patch('/:id', httpEmpleados.patchEmpleado)


export default router