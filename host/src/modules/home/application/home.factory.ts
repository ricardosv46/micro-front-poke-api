import { GetLastVisitedUseCase } from "./GetLastVisitedUseCase";
import { DismissLastVisitedUseCase } from "./DismissLastVisitedUseCase";
import { LastVisitedRepositoryImpl } from "../infrastructure/repositories/LastVisitedRepositoryImpl";

const lastVisitedRepository = new LastVisitedRepositoryImpl();

export const getLastVisitedUseCase = new GetLastVisitedUseCase(lastVisitedRepository);
export const dismissLastVisitedUseCase = new DismissLastVisitedUseCase(lastVisitedRepository);
