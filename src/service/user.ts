import request from "../common/axios";

export function myStorage() {
  return request.get(`/api/users/me`);
}
