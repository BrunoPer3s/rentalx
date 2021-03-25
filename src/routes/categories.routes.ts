import { Router } from "express";
import multer from "multer";
import path from 'path';

import { createCategoryController  } from "../modules/cars/UseCases/createCategory";
import { listCategoryController  } from "../modules/cars/UseCases/listCategories";
import { importCategoryController  } from "../modules/cars/UseCases/importCategory";

const categoriesRoutes = Router();
const upload = multer({
  dest: path.resolve(__dirname, '..', '..', 'tmp')
});


categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.create(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return listCategoryController.show(request, response);
});

categoriesRoutes.post('/import', upload.single("file") ,(request, response) => {
 return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
