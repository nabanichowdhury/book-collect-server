import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookController } from "./book.controller";
import { BookValidation } from "./book.validation";
const router = express.Router();


router.post("/create-book",validateRequest(BookValidation.createBookZodSchema),

BookController.createBook)
router.patch('/:id',validateRequest(BookValidation.updateBookZodSchema),BookController.updateBook)
router.delete("/:id",BookController.deleteBook)


router.get('/:id',BookController.getSingleBook)
router.get('/',BookController.getBooks)


export const BookRoutes = router;