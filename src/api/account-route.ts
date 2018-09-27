import {Request, Response} from 'express'

import RouterAbstract from '../router-abstract'
import AccountController from "../controller/account-controller";

class AccountRoute extends RouterAbstract {
  
  private static instance = new AccountRoute();
  
  constructor() {
    if (!!AccountRoute.instance) return AccountRoute.instance;
    super();
    this.setRoutes();
  }
  
  private setRoutes(): void {
    this.router.get('/:name', this.findAccountByName);
    this.router.delete('/:name', this.deleteAccount);
    this.router.put('/:name/password', this.updatePasswordByName);
    this.router.put('/:name/name', this.updateName);
  }
  
  private async findAccountByName(req: Request, res: Response): Promise<Response> {
    const name = req.params.name;
    
    const result = await AccountController.findByName(name);
    if (result.error) return res.sendStatus(500);
    if (result.account === null) return res.sendStatus(404);
    
    return res.status(200).json({
      ...result.account,
      password: null
    });
  }
  
  private async updatePasswordByName(req: Request, res: Response): Promise<Response> {
    const name = req.body.name;
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    
    const result = await AccountController.validateAccount(name, password);
    if (result.error || result.account === undefined) return res.sendStatus(result.status);
    
    const update = await AccountController.updatePasswordByName(name, newPassword);
    if (update.error) return res.sendStatus(update.status);
    
    return res.sendStatus(204);
  }
  
  private async updateName(req: Request, res: Response): Promise<Response> {
    const name = req.body.name;
    const newName = req.body.newName;
    const password = req.body.password;
    
    const result = await AccountController.validateAccount(name, password);
    if (result.error || result.account === undefined) return res.sendStatus(result.status);
    
    const update = await AccountController.updateName(name, newName);
    if (update.error) return res.sendStatus(update.status);
    
    return res.sendStatus(204);
  }
  
  private async deleteAccount(req: Request, res: Response): Promise<Response> {
    const name = req.body.name;
    const password = req.body.password;
    
    const result = await AccountController.validateAccount(name, password);
    if (result.error || result.account === undefined) return res.sendStatus(result.status);
  
    const remove = await AccountController.removeByName(name);
    if (remove.error) return res.sendStatus(500);
  
    return res.sendStatus(204);
  }
}

export default new AccountRoute;