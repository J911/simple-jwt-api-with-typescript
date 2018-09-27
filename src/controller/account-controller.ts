import {Account, IAccount} from '../models/account-model'
import {IResponse} from "../interface/response-interface";
import {hashSync, compareSync} from 'bcryptjs'

class AccountController {
  
  constructor() {
  }
  
  public async findByName(name: string): Promise<IResponse> {
    if (name === undefined) return { error: true, status: 400 };
    
    let account: IAccount;
    try { account = await Account.findOne({ name }) }
    catch (e) { return { error: true, status: 500 } }
    return { error: false, status: 200, account };
  }
  
  public async create(name: string, password: string): Promise<IResponse> {
    if (name === undefined || password === undefined) return { error: true, status: 400 };
    
    const hashedPassword = hashSync(password, 8);
    try { await Account.create({ name, password: hashedPassword }) }
    catch (e) { return { error: true, status: 500 } }
    return { error: false, status: 201 };
  }
  
  public async updatePasswordByName(name: string, newPassword: string): Promise<IResponse> {
    if (name === undefined || newPassword === undefined) return { error: true, status: 400 };
  
    const hashedPassword = hashSync(newPassword, 8);
    try { await Account.update({name}, { $set: { password: hashedPassword } }) }
    catch (e) { return { error: true, status: 500 } }
    return { error: false, status: 204 };
  }
  
  public async updateName(name: string, newName: string): Promise<IResponse> {
    if (name === undefined || newName === undefined) return { error: true, status: 400 };
    
    try { await Account.update({name}, { $set: { name: newName } }) }
    catch (e) { return { error: true, status: 500 } }
    return { error: false, status: 204 };
  }
  
  public async removeByName(name: string): Promise<IResponse> {
    if (name === undefined) return { error: true, status: 400 };
  
    try { await Account.remove({name}) }
    catch (e) { return { error: true, status: 500 } }
    return { error: false, status: 204 };
  }
  
  public async validateAccount(name: string, password: string): Promise<IResponse> {
    if (name === undefined || password === undefined) return { error: true, status: 400 };
  
    const result = await this.findByName(name);
    if (result.error || result.account === undefined) return { error: true, status: 500 };
    if (result.account === null) return { error: true, status: 404 };

    const passwordIsValid = compareSync(password, result.account.password);
    if (!passwordIsValid) return { error: true, status: 401 };
    
    return { error: false, status: 200, account: result.account };
  }
  
}

export default new AccountController;