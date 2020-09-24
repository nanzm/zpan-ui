export const USER_DETAIL_RES = "user_detail_res";

const ACTION_HANDLERS = {
  // 角色列表
  [USER_DETAIL_RES]: (state, action) => ({
    ...state,
    detail: action.payload,
  }),
};

const initialState = {
  detail: {},
};

function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

export default {
  namespace: "user",
  method: Reducer,
};
