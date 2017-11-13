import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from './modules/app';

import config from './common/config';
import logger from './common/utils/logger';
import { requestLog } from './common/middlewares/request-log';

/**
 * The server.
 *
 * @class Server
 */
class Server {
  private _expressApp: express.Application;
  private _nestApp: INestApplication;

  constructor() {
    // create expressjs application
    this._expressApp = express();

    // configure application
    this.config();
  }

  public static async bootstrap(): Promise<void> {
    try {
      // 初始化服务
      const server = new Server();
      server.run();
    } catch (err) {
      logger.error(`nest-starter backend server create failed! error(${err.message})`);
    }
  }

  private run(): void {
    this._nestApp.listen(config.port, () => {
      logger.info(`nest-starter backend is listening on port ${config.port}`);
      logger.info(`You can debug your app with ${config.host}:${config.port}\n`);
    });
  }

  private config(): void {
    // 中间件
    this._expressApp.use(bodyParser.json({ limit: '10mb' }));
    this._expressApp.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
    this._expressApp.use(cors()); // 跨域支持
    this._expressApp.use(requestLog); // 记录请求的duration
    this._nestApp = NestFactory.create(ApplicationModule, this._expressApp);
  }
}

Server.bootstrap();
