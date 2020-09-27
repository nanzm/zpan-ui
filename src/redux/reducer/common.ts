// 文件路径
export const SET_CURRENT_DIR = "set_current_dir";
export const CLEAR_CURRENT_DIR = "clear_current_dir";

// 上传
export const UPLOAD_STATE_CHANGE = "upload_state_change";
export const CLEAR_UPLOAD_ERR_MSG = "clear_upload_err_msg";
export const UPLOAD_PROGRESS = "upload_progress";

const ACTION_HANDLERS = {
  [SET_CURRENT_DIR]: (state, action) => {
    return { ...state, currentDir: action.payload };
  },
  [CLEAR_CURRENT_DIR]: (state) => {
    return { ...state, currentDir: "" };
  },

  [UPLOAD_STATE_CHANGE]: (state, action) => {
    return { ...state, ...action.payload };
  },
  [CLEAR_UPLOAD_ERR_MSG]: (state) => {
    return { ...state, uploadErrorMsg: "" };
  },
  [UPLOAD_PROGRESS]: (state, action) => {
    return { ...state, uploadProgress: action.payload };
  },
};

const initialState = {
  refreshTimeStamp: Date.now(),

  // 当前文件夹层级
  currentDir: "",

  // 上传
  uploading: false,
  uploadErrorMsg: "",
  uploadProgress: 0,
};

function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

export default {
  namespace: "common",
  method: Reducer,
};
