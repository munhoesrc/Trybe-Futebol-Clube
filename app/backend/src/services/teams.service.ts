import { ModelStatic } from 'sequelize';
import Team from '../database/models/TeamModel';
import IResponse from '../interfaces/Response';
import { generateResponse } from '../assets/generateResponse';

class TeamService {
  private model: ModelStatic<Team> = Team;

  async get(): Promise<IResponse> {
    const teams = await this.model.findAll();
    return generateResponse(200, teams);
  }

  async getById(id: number): Promise<IResponse> {
    const teamsZone = await this.model.findByPk(id);
    return generateResponse(200, teamsZone);
  }
}

export default TeamService;
