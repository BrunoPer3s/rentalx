import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoryService } from "./ListCategoriesService";


export class ListCategoryController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listCategoryService = container.resolve(ListCategoryService);

    const categories = await listCategoryService.execute();

    return response.json(categories);
  }
}
