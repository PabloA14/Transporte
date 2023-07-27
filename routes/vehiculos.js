import httpVehiculos from "../controllers/vehiculos.js";
import { Router } from "express";
import { check } from "express-validator"

const router = Router()

router.get("/", httpVehiculos.getVehiculos)

router.post("/",[
    check("matricula", "la matricula es obligatoria").notEmpty().isString().trim(),
    check("tipo", "el tipo es obligatorio").notEmpty().trim(),
    check("marca", "la marca es obligatoria").notEmpty().trim(),
    check("modelo", "el modelo es obligatorio").notEmpty().trim(),
    check("capacidad", "la capacidad es obligatoria").notEmpty().trim(),
], httpVehiculos.postVehiculo)

export default router