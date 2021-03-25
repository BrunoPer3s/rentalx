import { Request, Response } from "express";
import { CreateCategoryService } from "./CreateCategoryService";


export class CreateCategoryController {
  constructor(
    private createCategoryService: CreateCategoryService
  ) {}
  
  public create(request: Request, response: Response) {
    const { name, description } = request.body;
    
    this.createCategoryService.execute({
      name,
      description,
    });
  
    return response.status(201).send();
  }
}