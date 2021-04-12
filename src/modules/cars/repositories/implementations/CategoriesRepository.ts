import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<void> {
    const category = this.ormRepository.create({
      name,
      description,
    });

    await this.ormRepository.save(category);
  }

  public async findByName(name: string): Promise<Category> {
    const category = await this.ormRepository.findOne({
      where: { name },
    });

    return category;
  }

  public async list(): Promise<Category[]> {
    const categories = await this.ormRepository.find();

    return categories;
  }
}
