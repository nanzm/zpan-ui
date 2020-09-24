import { all } from "redux-saga/effects";
import { commonSaga } from "./common";

export default function* rootSaga() {
  yield all([commonSaga()]);
}
