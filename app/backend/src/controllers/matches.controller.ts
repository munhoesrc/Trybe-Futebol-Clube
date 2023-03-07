import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  private service: MatchesService = new MatchesService();

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      const { status, message } = await this.service.getAll(inProgress as string);
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async finish(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await finish(Number(req.params.id), this.service, res);
      res.status(status).json(message);
    } catch (err) {
      // console.error(err);
      next(err);
    }
  }
}

export default MatchesController;
