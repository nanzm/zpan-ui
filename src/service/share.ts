import axios from "../common/axios";

export function list(query) {
  return axios.get(`/api/shares`, { params: query });
}

export function find(alias, query) {
  return axios.get(`/api/shares/${alias}`, { params: query });
}

export function create(body) {
  return axios.post(`/api/shares`, body);
}
