import express from "express";
import visitorController from "../controller/visitor-controller.js";
import { upload } from "../middleware/multer.js";
import userController from "../controller/user-controller.js";
import purposeController from "../controller/purpose-controller.js";

const router = express.Router();

// auth
router.post("/register", userController.register);
router.post("/login", userController.login);

// user
router.get("/user", userController.getAll);

// visitor
router.post("/visitor", upload.single("idCard"), visitorController.create);
router.get("/visitor", visitorController.getAll);
router.post("/visitor/out/:visitorId", visitorController.out);
router.get("/visitor/idCard/:visitorId", visitorController.getIdCard);

// purpose
router.post("/purpose", purposeController.create);
router.get("/purpose", purposeController.getALl);
router.post("/purpose/update/:purposeId", purposeController.update);
router.post("/purpose/delete/:purposeId", purposeController.remove);

export default router;
