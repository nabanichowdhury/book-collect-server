import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AdminController } from "./admin.contoller";
import { AdminValidation } from "./admin.validation";
const router = express.Router();
router.post(
  "/create-admin",
  validateRequest(AdminValidation.createAdminZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.createAdmin
);

router.post(
  "/login",
  validateRequest(AdminValidation.loginAdminZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.loginAdmin
);
router.get(
  "/my-profile",
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.getAdminProfile
);
router.patch(
  "/my-profile",
  validateRequest(AdminValidation.updateAdminZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.updateAdminProfile
);

export const AdminRoutes = router;
