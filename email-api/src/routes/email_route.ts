import { Router } from "express";
import { emailController } from "../controllers/email_controller";

const router = Router();

router
  .get("/", emailController.getEmail)
  .post("/", emailController.addEmail)
  .delete("/:id", emailController.deleteEmail);

export default router;