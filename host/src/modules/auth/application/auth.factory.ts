import { LoginUseCase } from "./LoginUseCase";
import { MockAuthRepositoryImpl } from "../infrastructure/repositories/MockAuthRepositoryImpl";

// Swap MockAuthRepositoryImpl -> AuthRepositoryImpl once the backend is ready.
const authRepository = new MockAuthRepositoryImpl();

export const loginUseCase = new LoginUseCase(authRepository);
