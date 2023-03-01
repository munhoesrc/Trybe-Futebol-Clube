import { ModelStatic } from 'sequelize';
import Team from '../interfaces/Team';
import TeamModel from '../database/models/TeamModel';

class TeamService {
  private model: ModelStatic<TeamModel> = TeamModel;

  public async findAll(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams as Team[];
  }

  public async getById(id: number): Promise<Team> {
    const teamsZone = await this.model.findByPk(id);
    return teamsZone as Team;
  }
}

export default TeamService;
