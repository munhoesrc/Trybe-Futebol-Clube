import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { app } from '../app';
import Matches from '../database/models/MatchesModel';
import Team from '../database/models/TeamModel';
import { request } from 'chai';

chai.use(chaiHttp);

const { expect } = chai;

describe('Deve acessar o endpoint /leaderboard', () => {

  beforeEach(() => {
    sinon.restore();
  });

  const teamListMoch = [
    new Team({
      id: 2,
      teamName: 'Bahia',
    }),
  ];

  const matcheMoch = [
    new Matches({
      id: 4,
      homeTeamId: 3,
      awayTeamId: 2,
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      inProgress: false,
    }),
    new Matches({
      id: 10,
      homeTeamId: 2,
      awayTeamId: 9,
      homeTeamGoals: 0,
      awayTeamGoals: 2,
      inProgress: false,
    }),
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
    },
  ];

  it('Deve testar GET leaderboard home', async () => {
    const mockedFindAll = sinon.stub(Model, 'findAll');
    mockedFindAll.onFirstCall().callsFake(() => Promise.resolve(teamListMoch))
    mockedFindAll.onSecondCall().callsFake(() => Promise.resolve(matcheMoch));

    const response = await request(app).get('/leaderboard/home');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(resultEspecMoch);
  });
});
