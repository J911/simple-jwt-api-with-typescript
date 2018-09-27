import {IAccount} from "../models/account-model";

export interface IResponse {
  error: boolean,
  status: number,
  token?: string,
  account?: IAccount
}