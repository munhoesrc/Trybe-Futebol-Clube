import { IRouter, Router } from 'express';
import teamRoutes from './teams.route';
import userRoutes from './user.route';

// passando a rota
const spendRouter: IRouter = Router();
spendRouter.use(teamRoutes);
spendRouter.use(userRoutes);

export default spendRouter;
