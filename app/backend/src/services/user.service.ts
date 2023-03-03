import { ModelStatic } from 'sequelize';
// import * as bcrypt from 'bcryptjs';
import User from '../database/models/UserModel';
import Login from '../interfaces/Login';
import Response from '../interfaces/Response';
import generateToken from '../JWT/JWT';

class UserService {
  private model: ModelStatic<User> = User;

  async longin(body: Login): Promise<Response> {
    const allusers = await this.model.findAll();
    const user = allusers.find((element) => element.email === body.email);
    console.log(user);

    const { id, email, role, username } = user;
    const token = generateToken({ id, email, role, username });
    console.log(token);
  }
}

export default UserService;
