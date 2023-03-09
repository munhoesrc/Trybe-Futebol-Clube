import { IRouter, Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardController = new LeaderboardController();

const leaderboardRoutes: IRouter = Router();

leaderboardRoutes.get(
  '/leaderboard/home',
  leaderboardController.rankingHome.bind(leaderboardController),
);

export default leaderboardController;