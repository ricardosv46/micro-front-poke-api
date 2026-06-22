import { GetHistoryUseCase } from "./GetHistoryUseCase";
import { ClearHistoryUseCase } from "./ClearHistoryUseCase";
import { HistoryRepositoryImpl } from "../infrastructure/repositories/HistoryRepositoryImpl";

const historyRepository = new HistoryRepositoryImpl();

export const getHistoryUseCase = new GetHistoryUseCase(historyRepository);
export const clearHistoryUseCase = new ClearHistoryUseCase(historyRepository);
