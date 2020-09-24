export const COMMON_ROLE_LIST_RES = "common_role_list_res";

const ACTION_HANDLERS = {
  // 角色列表
  [COMMON_ROLE_LIST_RES]: (state, action) => ({
    ...state,
    roleList: action.payload,
  }),
};

const initialState = {
  roleList: [],
  currentSubject: null,
};

function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

export default {
  namespace: "common",
  method: Reducer,
};
