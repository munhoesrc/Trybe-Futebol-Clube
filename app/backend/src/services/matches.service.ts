import { ModelStatic } from 'sequelize';
import IResponse from '../interfaces/Response';
import { generateResponse } from '../assets/generateResponse';
import Matches from '../database/models/MatchesModel';
import Team from '../database/models/TeamModel';

class MatchesService {
  private model: ModelStatic<Matches> = Matches;

  async get(): Promise<IResponse> {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return generateResponse(200, matches);
  }
}

export default MatchesService;
