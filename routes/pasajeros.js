import httpPasajeros from "../controllers/pasajeros.js";
import { Router } from "express";
import { check } from "express-validator"

const router = Router()

router.get("/", httpPasajeros.getPasajeros)
router.get("/:cedula", httpPasajeros.getCedula);

router.post("/", [
    check("cedula", "la cédula es obligatoria").notEmpty().isString().trim(),
    check("cedula", "cedula máximo 10 caracteres").isLength({ max: 10 }).trim(),
    check("nombre", "el nombre es obligatorio").notEmpty().trim(),
    check("telefono", "el telefono es obligatorio").notEmpty().trim(),
    check("telefono", "telefono de máximo 12 caracteres").isLength({ max: 12 }),
], httpPasajeros.postPasajero)


export default router