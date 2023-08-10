import httplogin from "../controllers/logins.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

const router = Router()

router.get("/", httplogin.getLogin)

router.post("/", [
    check("usuario no valido").notEmpty().trim(),
    check("clave no valida").notEmpty().trim()
], httplogin.postLogin)

router.put('/:id', httplogin.putLogin)

router.post('/login', [
    check("usuario", "Ingrese el usuario").not().isEmpty(),
    check("clave","Ingrese la contraseña").not().isEmpty(),
    validarCampos
], httplogin.postSesion);

export default router