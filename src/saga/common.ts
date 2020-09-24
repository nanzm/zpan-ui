import { all, takeLatest, put, call } from "redux-saga/effects";
import { AnyAction } from "redux";

function* requestCommonList() {
  yield all([requestRoleList()]);
}

function* requestRoleList() {
  // const { data } = yield call(queryRoleList);
  // if (data.code === 0) {
  //   yield put({
  //     type: COMMON_ROLE_LIST_RES,
  //     payload: data.data,
  //   });
  // }
}

export const SAGA_GET_COMMON_LIST = "saga_get_common_list";

export function* commonSaga() {
  yield takeLatest(SAGA_GET_COMMON_LIST, requestCommonList);
}
