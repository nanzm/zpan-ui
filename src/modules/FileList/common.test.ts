import { getBreadcrumb } from "./common";

it("getBreadcrumb", function () {
  expect(getBreadcrumb("")).toEqual([{ name: "全部文件", to: "" }]);
  expect(getBreadcrumb("/")).toEqual([{ name: "全部文件", to: "" }]);

  expect(getBreadcrumb("/a")).toEqual([
    { name: "全部文件", to: "" },
    { name: "a", to: "a/" },
  ]);

  expect(getBreadcrumb("/a/b")).toEqual([
    { name: "全部文件", to: "" },
    { name: "a", to: "a/" },
    { name: "b", to: "a/b/" },
  ]);
});
