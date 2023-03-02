import { ModelStatic } from 'sequelize';
import User from '../database/models/UserModel';
import Login from '../interfaces/Login';
import Response from '../interfaces/Response';

class UserService {
  private model: ModelStatic<User> = User;

  async longin(body: Login): Promise<Response> {
    const allusers = await this.model.findAll();
    const user = allusers.find((element) => element.email === body.email);
    console.log(user);
  }
}

export default UserService;
