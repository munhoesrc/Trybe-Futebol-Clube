import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';

class UserController {
  private service: UserService = new UserService();

  async longin(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.longin(req.body);
      res.status(status).json(message);
    } catch (erro) {
      next(erro);
    }
  }
}

export default UserController;
