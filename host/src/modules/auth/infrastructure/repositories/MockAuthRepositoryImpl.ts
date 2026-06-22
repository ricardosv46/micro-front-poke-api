import type {
  AuthRepository,
  Credentials,
} from "../../domain/repositories/AuthRepository";
import type { User } from "../../domain/entities/User";

const MOCK_USER: User = { id: "1", email: "admin" };
const MOCK_CREDENTIALS = { email: "admin@gmail.com", password: "admin" };

export class MockAuthRepositoryImpl implements AuthRepository {
  login({ email, password }: Credentials): Promise<User> {
    const isValid =
      email === MOCK_CREDENTIALS.email &&
      password === MOCK_CREDENTIALS.password;

    if (!isValid) return Promise.reject(new Error("Invalid credentials"));

    return Promise.resolve(MOCK_USER);
  }
}
