import axios from "../common/axios";

export function list(params) {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/folders", { params: params })
      .then((data) => {
        resolve(
          data.data.list.map((item) => {
            item.fullpath = `${item.parent}${item.name}`;
            if (item.dirtype) item.fullpath += "/";
            return item;
          })
        );
      })
      .catch(reject);
  });
}

export function create(body) {
  return axios.post(`/api/folders`, body);
}

export function rename(alias, name) {
  return axios.patch(`/api/folders/${alias}/name`, { name: name });
}

export function move(alias, newDir) {
  return axios.patch(`/api/folders/${alias}/dir`, { dir: newDir });
}

export function deleteFolder(alias) {
  return axios.delete(`/api/folders/${alias}`);
}
