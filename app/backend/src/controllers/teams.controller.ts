import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

class TeamController {
  private service: TeamService = new TeamService();

  public async findAll(req: Request, res: Response): Promise<void> {
    const teamstfc = await this.service.findAll();
    res.status(200).json(teamstfc);
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const body = await this.service.getById(Number(id));
    res.status(200).json(body);
  }
}

export default TeamController;
