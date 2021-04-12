import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    password,
    email,
    driver_license,
    avatar,
    id
  }: ICreateUserDTO): Promise<void> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id
    });


    await this.ormRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findOne({
      where: {email}
    });

    return user;
  }

  public async findById(id: string): Promise<User> {
    const user = await this.ormRepository.findOne(id);
    
    return user;
  }
}
