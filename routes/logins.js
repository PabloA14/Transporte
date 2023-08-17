import httplogin from "../controllers/logins.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

const router = Router()

router.post('/login', [
    check("username", "Ingrese el usuario").trim().not().isEmpty(),
    check("clave","Ingrese la contraseña").trim().not().isEmpty(),
    validarCampos
], httplogin.postSesion);

export default router