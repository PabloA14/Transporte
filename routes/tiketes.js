import httpTiketes from "../controllers/tiketes.js"
import { Router } from "express"
import { check } from "express-validator"

const router = Router()

router.get("/", httpTiketes.getTiketes)

router.post("/", [
    check("numero", "el id es obligatorio").notEmpty().isString().trim(),
    check("vehiculo_matricula", "La matricula del vehiculo es obligatorio").notEmpty().isString()
], httpTiketes.postTikete)

router.get("/:numero", httpTiketes.getnumero);
router.put('/:id', httpTiketes.puttikete)

export default router
