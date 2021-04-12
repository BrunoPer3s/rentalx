import { getRepository, Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "../ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
  private ormRepository: Repository<Specification>;

  constructor() {
    this.ormRepository = getRepository(Specification)
  }

  public async create({ name, description }: ICreateSpecificationDTO): Promise<void>{
    const specification = this.ormRepository.create({
      name,
      description
    });

    await this.ormRepository.save(specification);
  }

  public async findByName(name: string): Promise<Specification> {
    const specification = await this.ormRepository.findOne({
      where: {name}
    });

    return specification;
  }
}
