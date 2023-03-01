import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando endpoint /teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;
  const teamsMoch = [
    {
      id:1,
      teamName: 'Avai/Kindermann'
    },
    {
      id:2,
      teamName: 'Bahia'
    },
    {
      id:3,
      teamName: 'Botafogo'
    }
  ]

  beforeEach(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(
        [
          {
            id:1,
            teamName: 'Avai/Kindermann'
          },
          {
            id:2,
            teamName: 'Bahia'
          },
          {
            id:3,
            teamName: 'Botafogo'
          }
        ] as Team[]);
      
  });

  afterEach(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('Se retorna todos os times', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.deep.equal;
  });
});
