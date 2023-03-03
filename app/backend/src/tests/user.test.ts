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

beforeEach(() => {
  sinon.restore();
});

  const userMock = [
    new User({
      id: 7,
      username: 'Username',
      role: 'admin',
      email: 'email@email.com',
      password: 'password'
    }),
  ];

  it('Deve testar POST user login', async () => {
    const body = { email: 'email@email.com', password: 'password'}
    sinon.stub(Model, 'findAll').resolves([userMock[0]]);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const postCall = await chai
      .request(app)
      .post('/login').send(body);

    expect(postCall.status).to.be.equal(200);
    expect(postCall.body).to.have.property('token')
  });

  it('Deve testar user login sem password', async () => {
    const body = { email: 'email@email.com', password: ''}
    sinon.stub(Model, 'findAll').resolvesArg(0);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const noPassword = await chai
      .request(app)
      .post('/login').send(body);

    expect(noPassword.status).to.be.equal(400);
    expect(noPassword.body).to.deep.include({ message: 'All fields must be filled'})
  });

  it('Deve testar user login sem email', async () => {
    const body = { email: '', password: 'password'}
    sinon.stub(Model, 'findAll').resolvesArg(0);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const noEmail = await chai
      .request(app)
      .post('/login').send(body);

    expect(noEmail.status).to.be.equal(400);
    expect(noEmail.body).to.deep.include({ message: 'All fields must be filled'})
  });

  it('Deve testar user login com email invalido', async () => {
    const body = { email: 'email', password: 'password'}
    sinon.stub(Model, 'findAll').resolves([userMock[0]]);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const validEmail = await chai
      .request(app)
      .post('/login').send(body);

    expect(validEmail.status).to.be.equal(401);
    expect(validEmail.body).to.deep.include({ message: 'Invalid email or password'})
  });

  it('Deve testar user login com password invalida', async () => {
    const body = { email: 'email@email.com', password: '123'}
    sinon.stub(Model, 'findAll').resolves([userMock[0]]);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const validPassword = await chai
      .request(app)
      .post('/login').send(body);

    expect(validPassword.status).to.be.equal(401);
    expect(validPassword.body).to.deep.include({ message: 'Invalid email or password'})
  });
});