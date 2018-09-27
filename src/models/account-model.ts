import * as mongoose from 'mongoose';

export interface IAccount extends mongoose.Document {
  _id: string,
  name: string,
  password: string
}

const AccountSchema = new mongoose.Schema ({
  name: String,
  password: String
});

mongoose.model('Account', AccountSchema);

export const Account = mongoose.model('Account');