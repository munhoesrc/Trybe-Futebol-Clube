import { IRouter, Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import verifyToken from '../middlewares/token.middleware';

const matchesController = new MatchesController();

const matchesRoutes: IRouter = Router();

matchesRoutes.get(
  '/matches',
  matchesController.getAll.bind(matchesController),
);

matchesRoutes.patch(
  '/matches/:id/finish',
  verifyToken,
  matchesController.finish.bind(matchesController),
);

matchesRoutes.patch(
  '/matches/:id',
  verifyToken,
  matchesController.doingUpdate.bind(matchesController),
);

export default matchesRoutes;
