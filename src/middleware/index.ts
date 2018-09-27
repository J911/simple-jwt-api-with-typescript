import RouterAbstract from '../router-abstract'
import * as AuthMiddleWare from './auth-middleware'

class Middleware extends RouterAbstract {
  
  private static instance = new Middleware();
  
  constructor() {
    if (!!Middleware.instance) return Middleware.instance;
    super();
    this.setRoutes();
  }
  
  private setRoutes(): void {
    this.route.use('/accounts', AuthMiddleWare.tokenValidationCheck)
  }
  
}

export default new Middleware;