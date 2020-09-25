import { get, isArray, isNull, isUndefined } from "lodash";

export const lodashGet = get;

export const noop = () => {};

export const resOK = (res) => {
  return res.data && res.data.code === 0;
};

export const resStatusOK = (res) => {
  return res.status && res.status <= 300;
};

export const resHasData = (res) => {
  return resOK(res) && res.data.data;
};

export const resHasList = (res) => {
  return resHasData(res) && res.data.data.list && isArray(res.data.data.list);
};

export const packageData = (data) => {
  // 移除 null undefined 避免后端解析错误
  const source = removeObjectNullAndUndefined(data);

  const formData = new FormData();
  Object.keys(source).forEach((key) => {
    formData.append(key, source[key]);
  });
  return formData;
};

export const getLastOne = (array) => {
  if (array && Array.isArray(array)) {
    return array[array.length - 1];
  }
  return null;
};

export const removeObjectNullAndUndefined = (data) => {
  // FormData 直接返回
  if (data instanceof FormData) return data;

  const newObj = {};
  Object.keys(data).forEach((key) => {
    const val = data[key];
    if (!isNull(val) && !isUndefined(val)) {
      newObj[key] = val;
    }
  });
  return newObj;
};

export const removeArrayItem = (array, item) => {
  if (!array || !Array.isArray(array)) return [];
  return array.filter((i) => i !== item);
};

export const getArrayItem = (arr) => {
  if (arr && arr.length) {
    if (arr[0] === "-1") return null;
    return arr[0];
  }
  return null;
};

export const isInArray = (array = [], item) => {
  return array.includes(item);
};

// 根据路由 role 配置过滤
export const filterRolesRouter = (routes, currentRole) => {
  return routes.filter((item) => {
    if (item.roles && Array.isArray(item.roles)) {
      return item.roles.includes(currentRole);
    }
    return true;
  });
};
