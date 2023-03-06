import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  private service: MatchesService = new MatchesService();

  async get(_req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.get();
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }
}

export default MatchesController;
