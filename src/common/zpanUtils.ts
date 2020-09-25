import axios from "./axios";

export function upload(fileObj, destURL, headers) {
  let file = fileObj.file;
  return new Promise((resolve, reject) => {
    let options = { headers: headers } as any;
    options.onUploadProgress = function (event) {
      file.percent = (event.loaded / event.total) * 100;
      if (fileObj.onProgress) fileObj.onProgress(file);
    };
  });
}

export function download(name, url) {
  return new Promise((resolve, reject) => {
    let a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    resolve();
  });
}

export function formatBytes(bytes, decimals) {
  if (bytes === 0) return "0 Bytes";
  let k = 1000,
    dm = decimals + 1 || 3,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function setupPasteUpload(fileCallback) {
  document.addEventListener("paste", (event: any) => {
    let clipboardData = null;
    if (event.clipboardData || event.originalEvent) {
      // 兼容问题
      clipboardData = event.clipboardData || event.originalEvent.clipboardData;
    }

    if (clipboardData && clipboardData.items) {
      event.preventDefault(); // 阻止默认行为

      let item = clipboardData.items[0];
      if (!item.type.startsWith("image")) {
        return;
      }

      let file = item.getAsFile();
      let filename = file.name.replace("image", new Date().getTime());
      fileCallback({ file: file, filename: filename });
    }
  });
}
