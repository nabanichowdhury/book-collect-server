import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
const router = express.Router();
router.post("/create-user", validateRequest(UserValidation.createUserZodSchema), UserController.createUser);
router.get("/my-profile", auth(ENUM_USER_ROLE.OWNER), UserController.getUserProfile);

router.patch(
  "/my-profile",
  
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUserProfile
);
router.delete("/:id", auth(ENUM_USER_ROLE.OWNER), UserController.deleteUser);

export const UserRoutes = router;
