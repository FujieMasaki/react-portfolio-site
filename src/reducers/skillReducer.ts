import { requestStates } from "../constants";

export type Action = {
  type:
    | "actionTypes.initial"
    | "actionTypes.fetch"
    | "actionTypes.success"
    | "actionTypes.error"
    | "languageList";
  payload?: LanguageList;
};

type LanguageList = {
  languageList?: LanguageState[];
};

type LanguageState = {
  language: string;
  count: number;
};

export type ActionTypes = {
  initial: string;
  fetch: string;
  success: string;
  error: string;
};

//reducerに渡す、また内部で参照する文字列
export const actionTypes: ActionTypes = {
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

export const skillReducer = (state: LanguageList, action: Action) => {
  switch (action.type) {
    case "actionTypes.initial": {
      return {
        languageList: [],
        requestState: requestStates.initial,
      };
    }
    case "actionTypes.fetch": {
      return {
        ...state,
        requestState: requestStates.loading,
      };
    }
    case "actionTypes.success": {
      return {
        languageList: action.payload?.languageList,
        requestState: requestStates.success,
      };
    }
    case "actionTypes.error": {
      return {
        languageList: [],
        requestState: requestStates.error,
      };
    }
    default: {
      throw new Error();
      // 予期せぬaction.typeが渡された場合
    }
  }
};
