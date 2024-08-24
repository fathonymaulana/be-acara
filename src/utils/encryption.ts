import crypto from "crypto";

const SECRET = "12cbba1cce8a6b6d57717eda62189cf1hkj";

export const encrypt = (password: string): string => {
  const encrypted = crypto
    .pbkdf2Sync(password, SECRET, 1000, 64, "sha512")
    .toString("hex");
  return encrypted;
};
