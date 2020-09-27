import axios from "../common/axios";
import store from "src/redux/createStore";
import { UPLOAD_PROGRESS } from "../redux/reducer/common";

export function getUploadSign(file, distDir, isPublic?) {
  const { name, type, size } = file;
  const body = { name, type, size, dir: distDir, public: !!isPublic };
  return axios.post("/api/files", body);
}

export function putToOss(url, file, headers) {
  return axios.put(url, file, {
    headers,
    onUploadProgress: (e) => {
      const percent = (e.loaded / e.total) * 100;
      store.dispatch({ type: UPLOAD_PROGRESS, payload: percent });
    },
  });
}

export function uploaded(alias) {
  return axios.patch(`/api/files/${alias}/uploaded`);
}

export function findLink(alias) {
  return axios.get(`/api/files/${alias}`);
}

// export function download(alias) {
//   return new Promise((resolve, reject) => {
//     this.findLink(alias).then((ret) => {
//       zpanUtils
//         .download(ret.name, ret.link)
//         .then(() => {
//           resolve(ret);
//         })
//         .catch(reject);
//     });
//   });
// }

export function getAllFiles(params) {
  return axios.get("/api/files", { params: params });
}

export function rename(alias, name) {
  return axios.patch(`/api/files/${alias}/name`, { name: name });
}

export function move(alias, newDir) {
  return axios.patch(`/api/files/${alias}/location`, { dir: newDir });
}

export function copy(alias, newPath) {
  return axios.patch(`/api/files/${alias}/duplicate`, {
    path: newPath,
  });
}

export function deleteFile(alias) {
  return axios.delete(`/api/files/${alias}`);
}
