import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { app } from '../app';
import Matches from '../database/models/MatchesModel';


chai.use(chaiHttp);

const { expect } = chai;

describe('Deve acessar o endpoint /matches', () => {
  beforeEach(() => sinon.restore());

  const MatchesList = [
    new Matches({
      id: 1,
      homeTeamId: 1,
      homeTeamGoals: 3,
      awayTeamId: 2,
      awayTeamGoals: 2,
      inProgress: true
    }),
    new Matches({
      id: 2,
      homeTeamId: 3,
      homeTeamGoals: 7,
      awayTeamId: 4,
      awayTeamGoals: 1,
      inProgress: false
    }),
  ]

  const matchesListControl = MatchesList.map(matche => matche.toJSON());

  it('Deve testar GET', async () => {
    sinon.stub(Model, 'findAll').resolves(MatchesList);

    const result = await chai.request(app).get('/Matchess');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(matchesListControl);
  });

  it('Deve testar GET com inProgress true', async () => {
    sinon.stub(Model, 'findAll').resolves(MatchesList);

    const result = await chai.request(app).get('/Matchess?inProgress=true');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal([matchesListControl[0]]);
  });

  it('Deve testar GET com inProgress false', async () => {
    sinon.stub(Model, 'findAll').resolves(MatchesList);

    const result = await chai.request(app).get('/Matchess?inProgress=false');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal([matchesListControl[1]]);
  });

  it('Deve retornar erro de autenticação ao finalizar a partida sem token', async () => {
    const matchId = 1;

    const response = await chai.request(app).patch(`/matches/${matchId}/finish`);

    expect(response).to.have.status(401);
    expect(response.body).to.deep.equal({ message: 'Token not found' });
  });

  it('Deve retornar erro de autenticação ao finalizar a partida com token inválido', async () => {
    const matchId = 1;
    const token = 'invalid-token';

    const response = await chai
      .request(app)
      .patch(`/matches/${matchId}/finish`)
      .set('Authorization', `Bearer ${token}`);

    expect(response).to.have.status(401);
    expect(response.body).to.deep.equal({ message: 'Token must be a valid token' });
  });

});