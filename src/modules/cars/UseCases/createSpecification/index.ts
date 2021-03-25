import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationService } from "./CreateSpecificationService";
import { CreateSpecificationController } from "./CreateSpecificationController";

const specificationsRepository = SpecificationsRepository.getInstance();
const createSpecificationService = new CreateSpecificationService(
  specificationsRepository
);

const createSpecificationController = new CreateSpecificationController(
  createSpecificationService
);

export { createSpecificationController };
