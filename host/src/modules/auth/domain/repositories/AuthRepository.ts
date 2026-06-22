import type { User } from "../entities/User";

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthRepository {
  login(credentials: Credentials): Promise<User>;
}
