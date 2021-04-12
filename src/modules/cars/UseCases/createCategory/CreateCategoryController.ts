import { Request, Response } from "express";
import { container } from 'tsyringe';
import { CreateCategoryService } from "./CreateCategoryService";


export class CreateCategoryController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCategoryService = container.resolve(CreateCategoryService);
    
    await createCategoryService.execute({
      name,
      description,
    });
  
    return response.status(201).send();
  }
}