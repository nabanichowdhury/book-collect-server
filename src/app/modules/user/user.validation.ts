import { z } from "zod";


const createUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "email is required",
    }),
    password: z.string({
      required_error: "password is required",
    }),
    books: z.array(z.string()).optional(),

  }),
});
const updateUserZodSchema = z.object({
    body: z.object({
      email: z.string().optional(),
      password: z.string().optional(),
      books: z.array(z.string()).optional(),
    }),
  });

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema
};
