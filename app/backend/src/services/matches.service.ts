import { ModelStatic } from 'sequelize';
import IResponse from '../interfaces/Response';
import IMatch from '../interfaces/Match';
import IUpdate from '../interfaces/Update';
import { generateResponse, generateError } from '../assets/generateResponse';
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

  async finish(id: number): Promise<IResponse> {
    const msg = 'Finished';
    await this.model.update({ inProgress: false }, { where: { id } });
    return generateResponse(200, { message: msg });
  }

  async doingUpdate(id: number, body: IUpdate): Promise<IResponse> {
    const msg = 'Updated';
    await this.model.update({ ...body }, { where: { id } });
    return generateResponse(200, { message: msg });
  }

  async newMatch(body: IMatch): Promise<IResponse> {
    const away = body.awayTeamId;
    const home = body.homeTeamId;
    if (away === home) {
      return generateError(422, 'It is not possible to create a match with two equal teams');
    }

    const teamId1 = await this.model.findByPk(body.awayTeamId);
    const teamId2 = await this.model.findByPk(body.homeTeamId);

    if (!teamId1 || !teamId2) {
      return generateError(404, 'There is no team with such id!');
    }
    const createdMatch = await this.model.create({ ...body });
    return generateResponse(201, createdMatch);
  }
}

export default MatchesService;
