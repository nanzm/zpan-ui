import {
  getLastOne,
  removeArrayItem,
  removeObjectNullAndUndefined,
} from "./helper";

it("getLastOne", function () {
  expect(getLastOne([1, 2])).toEqual(2);
  expect(getLastOne([])).toEqual(null);
});

it("removeObjectNullAndUndefined", function () {
  expect(removeObjectNullAndUndefined({ a: null })).toEqual({});
  expect(removeObjectNullAndUndefined({ a: undefined })).toEqual({});
  expect(removeObjectNullAndUndefined({ a: null, b: undefined })).toEqual({});
});

it("removeArrayItem", function () {
  expect(removeArrayItem([1, 2], 2)).toEqual([1]);
  expect(removeArrayItem([], 2)).toEqual([]);
  expect(removeArrayItem(null, 2)).toEqual([]);
});
