import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { app } from '../app';
import Team from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Deve acessar o endpoint /teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  const TeamsMoch = [
    new Team({
      id:1,
      teamName: 'Avai/Kindermann'
    }),
    new Team({
      id:2,
      teamName: 'Bahia'
    }),
    new Team({
        id:3,
        teamName: 'Botafogo'
    }),
  ]

  const Control = [
    {
      id: 1,
      teamName: 'Avai/Kindermann'
    },
    {
      id: 2,
      teamName: 'Bahia'
    },
    {
      id: 3,
      teamName: 'Botafogo'
    }
  ]

  it('Deve acessar GET teams', async () => {
    sinon.stub(Model, 'findAll').resolves(TeamsMoch);

    const getCall = await chai
      .request(app)
      .get('/teams');

    expect(getCall.status).to.be.eq(200);
    expect(getCall.body).to.be.an('array');
    expect(getCall.body).to.deep.eq(Control);
  });

  it('Deve acessar GET teams/:id', async () => {
    sinon.stub(Model, 'findByPk').resolves(TeamsMoch[0]);

    const getIdCall = await chai
      .request(app)
      .get('/teams/1');

    expect(getIdCall.status).to.be.eq(200);
    expect(getIdCall.body).to.deep.eq(Control[0]);
  })
});
