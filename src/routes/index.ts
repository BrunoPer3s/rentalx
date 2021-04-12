import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { userRoutes } from './users.routes';
import { authenticateRoutes } from './authenticate.routes';

const routes = Router();

routes.use('/categories',categoriesRoutes);
routes.use('/specifications',specificationsRoutes);
routes.use('/users',userRoutes);
routes.use('/sessions',authenticateRoutes);

export { routes }; 