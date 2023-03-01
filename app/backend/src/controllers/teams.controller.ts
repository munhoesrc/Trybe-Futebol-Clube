import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

class TeamController {
  private service: TeamService = new TeamService();

  public async findAll(req: Request, res: Response): Promise<void> {
    const teamstfc = await this.service.findAll();
    res.status(200).json(teamstfc);
  }
}

export default TeamController;
