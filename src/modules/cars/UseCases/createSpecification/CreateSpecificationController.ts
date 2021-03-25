import { Request, Response } from "express";
import { CreateSpecificationService } from "./CreateSpecificationService";

export class CreateSpecificationController {
  constructor(private createSpecificationService: CreateSpecificationService) {}

  public create(request: Request, response: Response): Response<void> {
    const { name, description } = request.body;

    this.createSpecificationService.execute({
      name,
      description,
    });

    return response.status(201).send();
  }
}
