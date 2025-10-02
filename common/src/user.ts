import z from "zod";

export const signUpInput = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(8).max(32),
}).strict();

export type SignUpInput = z.infer<typeof signUpInput>;

export const signInInput = z.object({
    email: z.email(),
    password: z.string(),
}).strict();

export type SignInInput = z.infer<typeof signInInput>;