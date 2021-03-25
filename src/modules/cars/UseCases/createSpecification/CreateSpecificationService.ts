import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationService {
  constructor(private speficicationsRepository: ISpecificationsRepository) {}

  public execute({ name, description }: IRequest): void {
    const specificationAlreadyExists = this.speficicationsRepository.findByName(
      name
    );

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    this.speficicationsRepository.create({
      name,
      description,
    });
  }
}
