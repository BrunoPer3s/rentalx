import { Router } from "express";
import multer from "multer";
import path from 'path';

import { CreateCategoryController } from "../modules/cars/UseCases/createCategory/CreateCategoryController";
import { ListCategoryController  } from "../modules/cars/UseCases/listCategories/ListCategoryController";
import { ImportCategoryController  } from "../modules/cars/UseCases/importCategory/ImportCategoryController";
import { ensureAuthenticaded } from "../modules/accounts/middlewares/ensureAuthenticated";

const categoriesRoutes = Router();
const upload = multer({
  dest: path.resolve(__dirname, '..', '..', 'tmp')
});

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();


categoriesRoutes.post("/", createCategoryController.create);

categoriesRoutes.get("/", ensureAuthenticaded ,listCategoryController.show);

categoriesRoutes.post('/import', upload.single("file") ,importCategoryController.handle);

export { categoriesRoutes };
