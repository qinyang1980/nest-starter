import config from '../config';
import * as log4js from 'log4js';
import * as fs from 'fs';

class Log {
  private logger: log4js.Logger;

  constructor() {
    const env = process.env.NODE_ENV || 'development';

    log4js.configure({
      appenders: [
        { type: 'console' },
        { type: 'dateFile', filename: 'logs/app.log', pattern: '-yyyy-MM-dd.log', category: 'app' },
        {
          type: 'logLevelFilter', level: 'ERROR',
          appender: {
            type: 'file',
            filename: 'logs/errors.log',
            maxLogSize: 10485760,
            numBackups: 8
          }
        }
      ],
      replaceConsole: true
    });

    if (!fs.existsSync('./logs')) { fs.mkdirSync('./logs'); }

    this.logger = log4js.getLogger('app');
    this.logger.setLevel(config.debug && env !== 'test' ? 'DEBUG' : 'ERROR');

    // 替换console
    log4js.replaceConsole(this.logger);
  }

  get instance(): log4js.Logger {
    return this.logger;
  }
}

const logger = (new Log()).instance;
export default logger;
