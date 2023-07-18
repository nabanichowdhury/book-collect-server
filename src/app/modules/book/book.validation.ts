import { z } from "zod";

const createBookZodSchema = z.object({
  body: z.object({
    image: z.string().optional(),
    title: z.string({
      required_error: "title is required",
    }),
    author: z.string({
      required_error: "author is required",
    }),
    genre: z.string({
      required_error: "genre is required",
    }),
    publicationYear: z.string({
      required_error: "publicationYear is required",
    }),
    owner: z.string().optional(),
    reviews: z.array(z.string()).optional(),
  }),
});
const updateBookZodSchema = z.object({
  body: z.object({
    image: z.string().optional(),
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    publicationYear: z.string().optional(),
    owner: z.string().optional(),
    reviews: z.array(z.string()).optional(),
  }),
});


export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema
};
