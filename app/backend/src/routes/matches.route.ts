import { IRouter, Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesController = new MatchesController();

const matchesRoutes: IRouter = Router();

matchesRoutes.get('/matches', matchesController.get.bind(matchesController));

export default matchesRoutes;
