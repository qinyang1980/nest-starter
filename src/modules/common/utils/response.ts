import logger from './logger';

/**
 * @author andy.qin
 * @description 统一定义返回结果的格式
 */
interface ICustomResponse {
  /**
   * 请求是否成功
   */
  success: boolean;
  /**
   * HTTP状态码(200,400,404,500)
   */
  status: number;
  /**
   * 成功才返回的查询数据
   */
  data?: Object | Object[];
  /**
   * 错误才返回的错误描述
   */
  errors?: any;
  /**
   * 整体描述
   */
  message: string;
  /**
   * 扩展属性
   */
  [propName: string]: any;
}

function failedJson(error: any): any {
  const result: ICustomResponse = {
    success: error.status === 200,
    status: error.status || 500,
    message: error.message || null
  };
  return { ...result, ...error };
}

function successJson(message: string, data: Object | Object[]): any {
  const result: ICustomResponse = {
    success: true,
    status: 200,
    message: message || null,
    data: data || {}
  };
  return result;
}

function formatFindAndCount(content: any): any {
  // findAndCount 类型的结果
  if (Array.isArray(content) && content.length === 2) {
    const [a, b] = content;
    if (Array.isArray(a) && Number.isInteger(b)) {
      content = { rows: a, count: b };
    }
  }
  return content;
}

function ok(data: Object | Object[]): any {
  return successJson('Request success.', formatFindAndCount(data));
}

function err(error: any): any {
  return failedJson(error);
}

const CustomResponse = { ok, err };
export default CustomResponse;
