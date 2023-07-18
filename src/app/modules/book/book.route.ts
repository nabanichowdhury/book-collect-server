import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BookController } from "./book.controller";
import { BookValidation } from "./book.validation";
const router = express.Router();


router.post("/create-book",validateRequest(BookValidation.createBookZodSchema),

BookController.createBook)
router.patch('/:id',validateRequest(BookValidation.updateBookZodSchema),auth(ENUM_USER_ROLE.OWNER),BookController.updateBook)
router.delete("/:id",auth(ENUM_USER_ROLE.OWNER),BookController.deleteBook)
router.get('/:id',BookController.getSingleBook)
router.get('/',BookController.getBooks)


export const BookRoutes = router;