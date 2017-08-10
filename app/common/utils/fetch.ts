import * as axios from 'axios';
import config from '../config';

/**
 * @author andy.qin
 * @description axios封装类
 */
export class Fetch {
  constructor(private instance: axios.AxiosInstance) {
  }

  public async get(url: string): Promise<any> {
    try {
      const ret = await this.instance.get(url);
      return ret.data;
    } catch (err) {
      return this.commonErrorHandle(err);
    }
  }

  public async post(url: string, data: any): Promise<any> {
    try {
      const ret = await this.instance.post(url, data);
      return ret.data;
    } catch (err) {
      return this.commonErrorHandle(err);
    }
  }

  public async put(url: string, data: any): Promise<any> {
    try {
      const ret = await this.instance.put(url, data);
      return ret.data;
    } catch (err) {
      return this.commonErrorHandle(err);
    }
  }

  public async del(url: string): Promise<any> {
    try {
      const ret = await this.instance.delete(url);
      return ret.data;
    } catch (err) {
      return this.commonErrorHandle(err);
    }
  }

  private commonErrorHandle(err: any): any {
    return err.response.data;
  }
}

// Set config defaults when creating the instance
const instance = axios.default.create();
const fetch = new Fetch(instance);
export default fetch;
