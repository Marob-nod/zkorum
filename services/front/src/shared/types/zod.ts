/** **** WARNING: GENERATED FROM SHARED DIRECTORY, DO NOT MOFIFY THIS FILE DIRECTLY! **** **/
import { z } from "zod";
import { validateDidKey, validateDidWeb } from "../did/util.js";

// Alpha only for ESSEC
function isAuthorizedEmail(email: Email) {
    const preprocessedEmail = email.trim();
    const [localPart, fqdn] = preprocessedEmail.split("@");
    if (
        preprocessedEmail.startsWith("b") &&
        /^\d+$/.test(localPart.substring(1)) &&
        fqdn === "essec.edu"
    ) {
        return true;
    } else {
        return false;
    }
}

export class ZodType {
    static email = z
        .string()
        .email()
        .max(254)
        .nonempty()
        .describe("Email address");
    static authorizedEmail = z
        .string()
        .email()
        .max(254)
        .nonempty()
        .describe("Email address")
        .refine((email: string) => {
            return isAuthorizedEmail(email);
        });
    static didKey = z
        .string()
        .describe("Decentralized Identifier with did:key method")
        .max(1000)
        .refine(
            (val: string) => {
                return validateDidKey(val);
            },
            {
                message:
                    "Please use a base58-encoded DID formatted `did:key:z...`",
            }
        );
    static didWeb = z
        .string()
        .describe("Decentralized Identifier with did:web method")
        .max(1000)
        .refine(
            (val: string) => {
                return validateDidWeb(val);
            },
            {
                message: "Please use a valid DID formatted `did:web:...`",
            }
        );
    static code = z.coerce.number().min(0).max(999999);
    static digit = z.coerce.number().int().nonnegative().lte(9);
    static userId = z.string().uuid().nonempty();
}
type Email = z.infer<typeof ZodType.email>;
