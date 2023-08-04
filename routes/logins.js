import httplogin from "../controllers/logins.js";
import { Router } from "express";
import { check } from "express-validator"

const router = Router()

router.get("/", httplogin.getLogin)

router.post("/", [
    check("usuario no valido").notEmpty().trim(),
    check("clave no valida").notEmpty().trim()
], httplogin.postLogin)

router.put('/:id', httplogin.putLogin)
router.post('/login', httplogin.postSesion);

export default router