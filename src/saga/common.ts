import { all, takeLatest, put, call } from "redux-saga/effects";
import { AnyAction } from "redux";
import { getUploadSign, putToOss, uploaded } from "src/service/file";
import { UPLOAD_STATE_CHANGE } from "../redux/reducer/common";
import { resOK, resStatusOK } from "src/common/helper";

function* uploadFile({ payload }: AnyAction) {
  const { file, dir } = payload;

  yield put({
    type: UPLOAD_STATE_CHANGE,
    payload: {
      uploading: true,
      uploadErrorMsg: "",
    },
  });

  try {
    // 获取上传信息
    const resSign = yield call(getUploadSign, file, dir);

    // 上传
    const { alias, link, headers } = resSign.data.data;
    yield call(putToOss, link, file, headers);

    // 已上传
    yield call(uploaded, alias);
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_STATE_CHANGE,
      payload: {
        uploadErrorMsg: err.toString(),
      },
    });
  }

  yield put({
    type: UPLOAD_STATE_CHANGE,
    payload: {
      uploading: false,
    },
  });
}

export const SAGA_UPLOAD = "saga_upload";

export function* commonSaga() {
  yield takeLatest(SAGA_UPLOAD, uploadFile);
}
