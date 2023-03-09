import { ModelStatic } from 'sequelize';
import IResponse from '../interfaces/Response';
import ILeaderboard from '../interfaces/Leaderbord';
import { generateResponse } from '../assets/generateResponse';
import Matches from '../database/models/MatchesModel';
import Team from '../database/models/TeamModel';

const counter = (string: string, arr: string[]) =>
  arr.reduce((sum, e) => sum + (e === string ? 1 : 0), 0);

const generateResults = (matches: Matches[]) =>
  matches.map((e) => {
    if (e.homeTeamGoals > e.awayTeamGoals) return 'victory';
    if (e.homeTeamGoals === e.awayTeamGoals) return 'draw';
    return 'lose';
  });

const ranking = (e: Team, results: string[], matchesByTeam: Matches[]) => {
  const goalsFavor = matchesByTeam.reduce((params1, params2) => params1 + params2.homeTeamGoals, 0);
  const goalsOwn = matchesByTeam.reduce((params1, params2) => params1 + params2.awayTeamGoals, 0);

  const totalVictories = counter('victory', results);
  const totalDraws = counter('draw', results);
  const totalLosses = counter('lose', results);

  return {
    name: e.teamName,
    totalPoints: totalVictories * 3 + totalDraws,
    totalGames: results.length,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
  };
};
class LeaderboardService {
  private matche: ModelStatic<Matches> = Matches;
  private team: ModelStatic<Team> = Team;

  async rankingHome(): Promise<IResponse> {
    const [teams, matches] = await Promise.all([
      this.team.findAll(),
      this.matche.findAll({ where: { inProgress: false } }),
    ]);

    const result: ILeaderboard[] = [];

    teams.forEach((e) => {
      const matchesByTeam = matches.filter((element) => element.homeTeamId === e.id);
      const resultes = generateResults(matchesByTeam);

      result.push(ranking(e, resultes, matchesByTeam));
    });
    return generateResponse(200, result);
  }
}

export default LeaderboardService;
