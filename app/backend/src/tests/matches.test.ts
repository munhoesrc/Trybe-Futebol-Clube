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

  beforeEach(() => {
  sinon.restore();
});

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoiQWRtaW4ifSwiaWF0IjoxNjc3NzYzODg0LCJleHAiOjE2Nzg2Mjc4ODR9.e5GVmFHZ9ZWiZ5Lc7kMNhXZjEu_DqnuMMwjRotatThY";

  const MatchesMoch = [
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

  const MatchesMochControl = [
    {
      id: 1,
      homeTeamId: 1,
      homeTeamGoals: 3,
      awayTeamId: 2,
      awayTeamGoals: 2,
      inProgress: true
    },
    {
      id: 2,
      homeTeamId: 3,
      homeTeamGoals: 7,
      awayTeamId: 4,
      awayTeamGoals: 1,
      inProgress: false
    }
  ]

  const doingCreation = {
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 2,
    inProgress: true,
  };

  it('Deve testar GET', async () => {
    sinon.stub(Model, 'findAll').resolves(MatchesMoch);

    const getTest = await chai
      .request(app)
      .get('/matches');

    expect(getTest.status).to.be.equal(200);
    expect(getTest.body).to.deep.equal(MatchesMochControl);
  });

  it('Deve testar GET com inProgress true', async () => {
    sinon.stub(Model, 'findAll').resolves(MatchesMoch);

    const inProgressTrue = await chai
      .request(app)
      .get('/matches?inProgress=true');

    expect(inProgressTrue.status).to.be.equal(200);
    expect(inProgressTrue.body).to.deep.equal([MatchesMochControl[0]]);
  });

  it('Deve testar GET com inProgress false', async () => {
    sinon.stub(Model, 'findAll').resolves(MatchesMoch);

    const inProgressFalse = await chai
      .request(app)
      .get('/matches?inProgress=false');

    expect(inProgressFalse.status).to.be.equal(200);
    expect(inProgressFalse.body).to.deep.equal([MatchesMochControl[1]]);
  });

  it('Deve retornar erro de autenticação ao finalizar a partida sem token', async () => {
    const matchId = 1;

    const response = await chai
      .request(app)
      .patch(`/matches/${matchId}/finish`);

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

  it('Deve retornar, com um status 200, a seguinte mensagem: "Finished"', async () => {
    const matchId = 1;
    const url = `/matches/${matchId}/finish`;
    const authToken = `${token}`;
    const expectedResponse = { message: 'Finished' };

    const updateStub = sinon.stub(Model, 'update').resolves();

    const response = await chai
    .request(app)
    .patch(url)
    .set({ Authorization: authToken });

  expect(response.status).to.equal(200);
  expect(response.body).to.deep.equal(expectedResponse);

  updateStub.restore();
  });

  it('Deve acessar o create do matche de modo que seja possível cadastrar nova pardida', async () => {
    const matchStub = sinon.stub(Model, 'create').resolves(MatchesMoch[1]);

    const response = await chai
      .request(app)
      .post('/matches')
      .send(doingCreation)
      .set({ Authorization: `${ token }`});

    expect(response.status).to.be.equal(201);
    expect(response.body).to.deep.equal(MatchesMochControl[1]);

    matchStub.restore();
  });
  
});