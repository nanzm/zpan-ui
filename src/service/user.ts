import request from "../common/axios";

// 登录
export function login(params) {
  return request({
    method: "POST",
    url: "/user/login",
    params,
  });
}

// 登出
export function logout() {
  return request({
    method: "POST",
    url: "/user/logout",
  });
}

// 修改密码
export function changePwd(params) {
  return request({
    method: "POST",
    url: "/user/password/update",
    params,
  });
}

// 重置密码
export function resetPwd(params) {
  return request({
    method: "POST",
    url: "/user/password/reset",
    params,
  });
}

// 查询登录用户信息
export function queryUserDetail() {
  return request({
    method: "POST",
    url: "/user/query/current",
  });
}

// 查询用户列表
export function queryUserList(params) {
  return request({
    method: "POST",
    url: "/user/query/list",
    params,
  });
}

// 新增用户
export function createUser(params) {
  return request({
    method: "POST",
    url: "/user/create",
    params,
  });
}

// 更新用户
export function updateUser(params) {
  return request({
    method: "POST",
    url: "/user/update",
    params,
  });
}

// 删除用户
export function deleteUser(params) {
  return request({
    method: "POST",
    url: "/user/delete",
    params,
  });
}
