export const UPLOAD_STATE_CHANGE = "upload_state_change";
export const CLEAR_UPLOAD_ERR_MSG = "clear_upload_err_msg";
export const UPLOAD_PROGRESS = "upload_progress";

const ACTION_HANDLERS = {
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
