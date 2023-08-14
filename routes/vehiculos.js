import httpVehiculos from "../controllers/vehiculos.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

const router = Router()

router.get("/", httpVehiculos.getVehiculos)
router.get("/:matricula", httpVehiculos.getMatricula);

router.post("/", [
    check("matricula", "La matrícula es obligatoria").trim().not().isEmpty(),
    check("matricula", "La matrícula no valida").trim().isLength({ max: 10 }),
    check("chofer_id", "El conductor es obligatorio").trim().not().isEmpty(),
    check("tipo", "El tipo es obligatorio").trim().not().isEmpty(),
    check("marca", "La marca es obligatoria").trim().not().isEmpty(),
    check("modelo", "El modelo es obligatorio").trim().not().isEmpty(),
    check("capacidad", "La capacidad es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpVehiculos.postVehiculo)

router.put("/:id", [
    check("matricula", "La matrícula es obligatoria").trim().not().isEmpty(),
    check("matricula", "La matrícula no valida").trim().isLength({ max: 10 }),
    check("tipo", "El tipo es obligatorio").trim().not().isEmpty(),
    check("marca", "La marca es obligatoria").trim().not().isEmpty(),
    check("modelo", "El modelo es obligatorio").trim().not().isEmpty(),
    check("capacidad", "La capacidad es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpVehiculos.putVehiculo)

router.patch("/:id", httpVehiculos.patchVehiculo);

export default router