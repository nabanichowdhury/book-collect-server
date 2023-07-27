import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
const router = express.Router();
router.post("/create-user", validateRequest(UserValidation.createUserZodSchema), UserController.createUser);
router.get("/my-profile", UserController.getUserProfile);

router.patch(
  "/my-profile",
  
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUserProfile
);
router.delete("/:id",  UserController.deleteUser);
router.post("/wish-list",  UserController.wishListBook);


router.get("/wish-list",  UserController.getWishListBook);
router.get("/read-list",  UserController.getReadListBook);
router.patch("/mark-read-unread",  UserController.markReadUnreadBook);

router.post("/read-list",  UserController.readListBook);


export const UserRoutes = router;
