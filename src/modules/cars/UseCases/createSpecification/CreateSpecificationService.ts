import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationService {
  constructor(
    @inject('SpecificationsRepository')
    private speficicationsRepository: ISpecificationsRepository
  ) {}

  public async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.speficicationsRepository.findByName(
      name
    );

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists!");
    }

    await this.speficicationsRepository.create({
      name,
      description,
    });
  }
}
