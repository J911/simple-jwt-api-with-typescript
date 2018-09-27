import {Request, Response} from 'express'

import RouterAbstract from '../router-abstract'
import AuthController from "../controller/auth-controller";

class AuthRoute extends RouterAbstract {
  
  private static instance = new AuthRoute();
  
  constructor() {
    if (!!AuthRoute.instance) return AuthRoute.instance;
    super();
    this.setRoutes();
  }
  
  private setRoutes(): void {
    this.router.post('/sign-in', this.signin);
    this.router.post('/sign-up', this.signup);
  }
  
  private async signin(req: Request, res: Response): Promise<Response> {
    const name = req.body.name;
    const password = req.body.password;
  
    const result = await AuthController.signin(name, password);
    
    if (result.error) return res.sendStatus(result.status);
    
    return res.status(result.status).json({ token: result.token });
  }
  
  private async signup(req: Request, res: Response): Promise<Response> {
    const name = req.body.name;
    const password = req.body.password;
    
    const result = await AuthController.signup(name, password);
    
    return res.sendStatus(result.status);
  }
  
}

export default new AuthRoute;