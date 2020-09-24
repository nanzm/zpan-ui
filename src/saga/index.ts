import { all } from "redux-saga/effects";
import { commonSaga } from "src/saga/common";

export default function* rootSaga() {
  yield all([commonSaga()]);
}
