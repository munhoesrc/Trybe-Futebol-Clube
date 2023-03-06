import { IRouter, Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesController = new MatchesController();

const matchesRoutes: IRouter = Router();

matchesRoutes.get('/matches', matchesController.getAll.bind(matchesController));

export default matchesRoutes;
