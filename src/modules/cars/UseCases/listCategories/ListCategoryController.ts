import { Request, Response } from "express";
import { ListCategoryService } from "./ListCategoriesService";


export class ListCategoryController {
  constructor(
    private listCategoryService: ListCategoryService
  ) {}

  public show(request: Request, response: Response): Response<void> {
    const categories = this.listCategoryService.execute();

    return response.status(200).json(categories);
  }
}
