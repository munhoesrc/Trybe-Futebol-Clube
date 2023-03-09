import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  private service: LeaderboardService = new LeaderboardService();

  async rankingHome(_req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.rankingHome();
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async leaderboardAway(_req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.leaderboardAway();
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}

export default LeaderboardController;
