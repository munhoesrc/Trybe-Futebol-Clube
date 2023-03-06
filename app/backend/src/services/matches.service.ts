import { ModelStatic } from 'sequelize';
import IResponse from '../interfaces/Response';
import { generateResponse } from '../assets/generateResponse';
import Matches from '../database/models/MatchesModel';
import Team from '../database/models/TeamModel';

class MatchesService {
  private model: ModelStatic<Matches> = Matches;

  async getAll(inProgress: string): Promise<IResponse> {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    if (inProgress === 'true') {
      const filteredMatches = matches.filter((e) => e.inProgress);
      return generateResponse(200, filteredMatches);
    } if (inProgress === 'false') {
      const filteredMatches = matches.filter((e) => !e.inProgress);
      return generateResponse(200, filteredMatches);
    }
    return generateResponse(200, matches);
  }
}

export default MatchesService;
