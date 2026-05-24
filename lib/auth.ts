import jwt from "jsonwebtoken";

const SECRET = process.env.AUTH_SECRET || "dev-secret";

export function signToken(payload: object, opts?: jwt.SignOptions) {
  return jwt.sign(payload as any, SECRET, { expiresIn: "7d", ...(opts || {}) });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as any;
  } catch (e) {
    return null;
  }
}
