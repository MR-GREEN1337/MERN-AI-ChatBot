import { NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};

const loginValidator = [
    body("email").trim().isEmail().withMessage("email is required"),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .notEmpty()
        .withMessage("password is required"),
];

const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];

export default {loginValidator, signupValidator, validate};