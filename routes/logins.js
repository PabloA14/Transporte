import httplogin from "../controllers/logins.js";
import { Router } from "express";
import { check } from "express-validator"

const router = Router()

router.get("/", httplogin.getLogin)

router.post("/", [
    check("usuaruio no valido").notEmpty().trim(),
    check("clave no valida").notEmpty().trim()
], httplogin.postLogin)

export default router