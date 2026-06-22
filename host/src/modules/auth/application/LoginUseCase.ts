import type {
  AuthRepository,
  Credentials,
} from "../domain/repositories/AuthRepository";
import type { User } from "../domain/entities/User";

export class LoginUseCase {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  execute(credentials: Credentials): Promise<User> {
    return this.authRepository.login(credentials);
  }
}
