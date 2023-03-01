import { ModelStatic } from 'sequelize';
import Team from '../interfaces/Team';
import TeamModel from '../database/models/TeamModel';

class TeamService {
  private model: ModelStatic<TeamModel> = TeamModel;

  public async findAll(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams as Team[];
  }
}

export default TeamService;
