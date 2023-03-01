import { Request, Response, Router } from 'express';
import TeamController from '../controllers/teams.controller';

class TeamRoute {
  public route: Router;
  private controller: TeamController = new TeamController();

  constructor() {
    this.route = Router();
    this.init();
  }

  private init(): void {
    this.route.get('/', (req: Request, res: Response) => {
      this.controller.findAll(req, res);
    });
    this.route.get('/:id', (req: Request, res: Response) => {
      this.controller.getById(req, res);
    });
  }
}

export default TeamRoute;
