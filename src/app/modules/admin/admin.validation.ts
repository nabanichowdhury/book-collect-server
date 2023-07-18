import { z } from "zod";
import { role } from "./admin.constants";


const createAdminZodSchema = z.object({
  body: z.object({
   
    
    role: z.enum([...role] as [string, ...string[]], {
      required_error: "role is required",
    }),
    password: z.string({
        required_error:"Password is required"
    }),

    name: z.object({
      firstName: z.string({
        required_error: "First name is required",
      }),
      lastName: z.string({
        required_error: "Last name is required",
      }),
    }),
    phoneNumber: z.string({
        required_error: " contact number is required",
      }),

    
    address: z.string({
      required_error: " address is required",
    }),
    
  }),
});
const updateAdminZodSchema = z.object({
  body: z.object({
    role: z.string().optional(),
    password: z.string().optional(),

    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }).optional(),
    phoneNumber: z.string().optional(),

    
    address: z.string().optional(),
    
  }),
});
const loginAdminZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: " contact number is required",
    }),

    
    
    password: z.string({
        required_error:"Password is required"
    }),

   
    
   
  }),
});


export const AdminValidation = {
  createAdminZodSchema,
  loginAdminZodSchema,
  updateAdminZodSchema

};
