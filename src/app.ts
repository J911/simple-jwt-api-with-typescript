import * as express from 'express'
import * as bodyParser from "body-parser"
import * as mongoose from 'mongoose'
import * as env from './environment/environment-handler'

import Api from './api'

export default class App {
  
  private app: express.Application;
  
  get application(): express.Application {
    return this.app;
  }
  
  constructor(port?: number) {
    this.app = express();
    this.connectDatabase();
    this.setRoute();
  }

  private connectDatabase(): void {
    // @ts-ignore
    mongoose.connect(env.db.host, {useNewUrlParser: true});
  }

  private setRoute(): void {
    this.app.use('/api/v1', Api.route);
  }

  public listen(port: number = 3000): void {
    this.app.listen(port, () => {
      console.log("server is running");
    });
  }
  
}