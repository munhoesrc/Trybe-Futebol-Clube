import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { app } from '../app';
import User from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Deve acessar o endpoint /login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  beforeEach(sinon.restore);

  const UserMoch = [
    new User({
      id: 7,
      username: 'Username',
      role: 'admin',
      email: 'email@email.com',
      password: 'password'
    })
  ]

  // const UserControl = [
  //   {
  //     id: 7,
  //     username: 'Username',
  //     role: 'admin',
  //     email: 'email@email.com',
  //     password: 'password'
  //   }
  // ]

  it('Deve testar POST user login', async () => {
    const body = { email: 'email@email.com', password: 'password'}
    sinon.stub(Model, 'findAll').resolves([UserMoch[0]]);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const postCall = await chai
      .request(app)
      .post('/login').send(body);

    expect(postCall.status).to.be.equal(200);
    expect(postCall.body).to.haveOwnProperty('token')
  });
});