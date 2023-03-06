import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';

class UserController {
  private service: UserService = new UserService();

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.login(req.body);
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  static getRole(_req: Request, res: Response<{ role: string }>, next: NextFunction) {
    try {
      const { role } = res.locals.user.payload;
      res.status(200).json({ role });
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
