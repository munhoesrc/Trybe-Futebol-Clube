import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';

import { app } from '../app';
import  TeamModel  from '../database/models/TeamModel';
import  MatchModel from '../database/models/MatchesModel';
import  leaderboardHome  from '../controllers/leaderboard.controller';

chai.use(chaiHttp);

const { expect } = chai;

describe('Deve acessar o endpoint /leaderboard', () => {

  beforeEach(() => {
    sinon.restore();
  });

  const teamMoch = [
    {
      id: 2,
      teamName: 'Bahia',
    },
  ];

  const matchMoch = [
    {
      id: 4,
      homeTeamId: 3,
      awayTeamId: 2,
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      inProgress: false,
    },
    {
      id: 10,
      homeTeamId: 2,
      awayTeamId: 9,
      homeTeamGoals: 0,
      awayTeamGoals: 2,
      inProgress: false,
    },
  ];

  const resultEspecMoch = [
    {
      name: 'Bahia',
      totalPoints: 0,
      totalGames: 1,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 1,
      goalsFavor: 0,
      goalsOwn: 2,
      goalsBalance: -2,
      efficiency: 0
    },
  ];

  it('Deve testar GET leaderboard home', async () => {
    const teamModelStub = sinon.stub(TeamModel, 'findAll').resolves(teamMoch);
    const matchModelStub = sinon.stub(MatchModel, 'findAll').resolves(matchMoch);

    const result = await leaderboardHome();

    expect(teamModelStub.calledOnce).to.be.true;
    expect(matchModelStub.calledOnce).to.be.true;
    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(resultEspecMoch);
  });
});
