import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/UserModel';
import Login from '../interfaces/Login';
import Response from '../interfaces/Response';
import generateToken from '../JWT/JWT';
import { generateResponse, generateResponseError } from '../assets/generateResponse';
import { testValidation } from './validations/inputs';

class UserService {
  private model: ModelStatic<User> = User;

  async longin(body: Login): Promise<Response> {
    const allusers = await this.model.findAll();
    const user = allusers.find((element) => element.email === body.email);
    // console.log(user);

    const error = testValidation(body);
    if (error) return generateResponseError(401, 'Invalid email or password');

    const checking = bcrypt.compareSync(body.password, user?.password || ' ');
    if (!user || !checking) return generateResponseError(401, 'Invalid email or password');

    const { id, email, role, username } = user;
    const token = generateToken({ id, email, role, username });
    // console.log(token);
    return generateResponse(200, { token });
  }
}

export default UserService;
