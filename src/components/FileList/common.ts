/**
 * eg: getBreadcrumb("/a/b/c")
 * [
 *  { name: "全部文件", to: "" },
 *  { name: "a", to: "a/" },
 *  { name: "b", to: "a/b/" },
 *  { name: "c", to: "a/b/c/" },
 * ]
 */
export const getBreadcrumb = (dir) => {
  const allFile = { name: "全部文件", to: "" };
  if (!dir || dir === "/") return [allFile];

  const result = dir
    .split("/")
    .filter((i) => !!i)
    .map((cur, index, arr) => {
      const tPath = arr.slice(0, index + 1).join("/");
      const to = tPath ? tPath + "/" : "";
      return {
        name: cur,
        to,
      };
    });
  result.unshift(allFile);
  return result;
};

export const getFileExt = (filename: string): string => {
  if (filename) {
    const ext = filename.split(".").pop();
    return `${ext}`;
  }
  return "";
};

export const formatIconName = (name: string): string => {
  if (!name) return "unknown";

  const has = [
    "doc",
    "pdf",
    "jpg",
    "jpeg",
    "png",
    "gif",
    "xls",
    "zip",
    "ppt",
    "psd",
    "ai",
    "rar",
    "txt",
    "exe",
    "mov",
    "avi",
    "html",
    "mp3",
  ].includes(name.toLowerCase());
  if (has) return name.toLocaleLowerCase();

  return "unknown";
};
