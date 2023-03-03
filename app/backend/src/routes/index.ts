import { Router } from 'express';
import userRoutes from './user.route';

// passando a rota
const spendRouter = Router();
spendRouter.use(userRoutes);

export default spendRouter;
