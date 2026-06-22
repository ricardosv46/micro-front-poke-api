import type { Credentials } from "../repositories/AuthRepository";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 4;

export function validateCredentials({ email, password }: Credentials): string | null {
  if (!email || !password) return "Completa email y contraseña";
  if (!EMAIL_REGEX.test(email)) return "El email no es válido";
  if (password.length < MIN_PASSWORD_LENGTH) return "La contraseña es muy corta";

  return null;
}
