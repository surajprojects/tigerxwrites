import { MyContext } from "../utils/init";

export const verifyCaptcha = async (c: MyContext, next: () => Promise<void>) => {
    try {
        const body: { captchaToken: string } = await c.req.json();
        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                secret: c.env.SECRET_KEY,
                response: body.captchaToken,
            }),
        });
        const result: { success: boolean } = await response.json();
        if (result.success) {
            await next();
        } else {
            throw new Error;
        }
    }
    catch (error) {
        c.status(500);
        return c.json({ message: "Internal Server Error!!!" });
    }
};