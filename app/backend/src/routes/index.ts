import { IRouter, Router } from 'express';
import teamRoutes from './teams.route';
import userRoutes from './user.route';
import matchesRoutes from './matches.route';
import leaderboardRoutes from './leaderboard.route';

// passando a rota
const spendRouter: IRouter = Router();
spendRouter.use(teamRoutes);
spendRouter.use(userRoutes);
spendRouter.use(matchesRoutes);
spendRouter.use(leaderboardRoutes);

export default spendRouter;
