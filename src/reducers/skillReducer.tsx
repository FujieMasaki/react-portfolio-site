import { requestStates } from "../constants";

type Action = {
  type: string;
};

type actionTypes = {
  initial: string;
  fetch: string;
  success: string;
  error: string;
};
//reducerに渡す、また内部で参照する文字列
export const actionTypes = {
  initial: "INITIAL",
  fetch: "FETCHING",
  success: "FETCH_SUCCESS",
  error: "FETCH_ERROR",
};

// 初期ステート
export const initialState = {
  languageList: [],
  requestState: requestStates.idle,
};

export const skillReducer = (state: string, action: Action) => {
  switch (action.type) {
    case actionTypes.initial: {
      return {
        languageList: [],
        requestState: requestStates.initial,
      };
    }
    case actionTypes.fetch: {
      return {
        ...state,
        requestState: requestStates.loading,
      };
    }
    case actionTypes.success: {
      return {
        languageList: action.payload.languageList,
        requestState: requestStates.success,
      };
    }
    case actionTypes.error: {
      return {
        languageList: [],
        requestState: requestStates.error,
      };
    }
    default: {
      throw new Error();
    }
  }
};