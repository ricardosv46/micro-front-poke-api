import { httpClient } from "../../../../core/http/httpClient";
import type { AuthRepository, Credentials } from "../../domain/repositories/AuthRepository";
import type { User } from "../../domain/entities/User";

export class AuthRepositoryImpl implements AuthRepository {
  login(credentials: Credentials): Promise<User> {
    return httpClient.post<User>("/api/auth/login", credentials);
  }
}
