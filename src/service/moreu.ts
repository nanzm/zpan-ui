import axios from "../common/axios";

export function signup(body) {
  return axios.post("/api/moreu/users", body);
}

export function activate(email: string, token: string) {
  const body = { token: token, activated: true };
  return axios.patch(`/api/moreu/users/${email}`, body);
}

export function passwordReset(email: string, token: string, newpwd: string) {
  const body = { token: token, password: newpwd };
  return axios.patch(`/api/moreu/users/${email}`, body);
}

export function applyPasswordReset(email: string) {
  const body = { email: email };
  return axios.post("/api/moreu/tokens", body);
}

export function signIn(body) {
  return axios.post("/api/moreu/tokens", body);
}

export function signOut() {
  return axios.delete("/api/moreu/tokens");
}

export function profile() {
  return axios.get("/api/moreu/user");
}

export function find(username) {
  return axios.get(`/api/moreu/users/${username}`);
}
