import httpVehiculos from "../controllers/vehiculos.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

const router = Router()

router.get("/", httpVehiculos.getVehiculos)
router.get("/:matricula", httpVehiculos.getMatricula);

router.post("/", [
    check("matricula", "la matricula es obligatoria").trim().not().isEmpty(),
    check("tipo", "el tipo es obligatorio").trim().not().isEmpty(),
    check("marca", "la marca es obligatoria").trim().not().isEmpty(),
    check("modelo", "el modelo es obligatorio").trim().not().isEmpty(),
    check("capacidad", "la capacidad es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpVehiculos.postVehiculo)

router.put("/:id", httpVehiculos.putVehiculo)
router.patch("/:id", httpVehiculos.patchVehiculo);

export default router