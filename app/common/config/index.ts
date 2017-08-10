import { configDevelopment } from './config.dev';
import { configProduction } from './config.prod';
import { commonSetting } from './setting';

const DEV = 'development';

// 通过NODE_ENV来设置环境变量，如果没有指定则默认为开发环境
let env = process.env.NODE_ENV || DEV;
env = env.toLowerCase();

function getConfig(): any {
  return env === DEV ? configDevelopment : configProduction;
}

// 将setting,error跟config合并
const config = Object.assign({}, getConfig(), commonSetting);

export default config;
