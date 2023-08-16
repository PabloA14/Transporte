import httplogin from "../controllers/logins.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

const router = Router()

router.post('/login', httplogin.postSesion);

export default router