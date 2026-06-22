import type { LastVisitedRepository } from "../domain/repositories/LastVisitedRepository";

export class DismissLastVisitedUseCase {
  private lastVisitedRepository: LastVisitedRepository;

  constructor(lastVisitedRepository: LastVisitedRepository) {
    this.lastVisitedRepository = lastVisitedRepository;
  }

  execute(id: number): void {
    this.lastVisitedRepository.dismiss(id);
  }
}
