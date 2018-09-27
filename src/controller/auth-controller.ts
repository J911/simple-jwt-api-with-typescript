import * as jwt from 'jsonwebtoken'

import AccountController from './account-controller'
import {IResponse} from "../interface/response-interface";
import * as env from '../environment/environment-handler'

class AuthController {
  
  constructor() {
  }
  
  public async signin(name: string, password: string): Promise<IResponse> {
    if (name === undefined || password === undefined)  return { error: true, status: 400 };
    
    const result = await AccountController.validateAccount(name, password);
    if (result.error || result.account == undefined) return { error: true, status: result.status };
    
    // @ts-ignore
    const token = jwt.sign({id: result.account._id}, env.jwt.secret, {expiresIn: 86400});
    return { error: false, status: 200, token };
  }
  
  public async signup(name: string, password: string): Promise<IResponse> {
    if (name === undefined || password === undefined) return { error: true, status: 400 };
  
    const result = await AccountController.findByName(name);
    if (result.error) return { error: true, status: 500 };
    if (result.account !== null) return { error: true, status: 409 };
    
    const createAccount = await AccountController.create(name, password);
    if (createAccount.error) return { error: true, status: 500 };
    
    return { error: false, status: 201 };
  }
  
}

export default new AuthController;