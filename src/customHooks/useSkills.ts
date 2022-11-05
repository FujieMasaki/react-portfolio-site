import { useEffect, useReducer, VFC } from "react";
import axios from "axios";

import {
  skillReducer,
  initialState,

  Action,
  LanguageState,
} from "../reducers/skillReducer";

import { LanguageList } from "../reducers/skillReducer";

type Language = {
  state: string[];
  dispatch?: string;
  language: string;
};

export const useSkills = () => {
  // stateはlanguageListとrequestStateを初期化している
  // dispatchはaction
  // initialStateは初期ステート
  const [state, dispatch] = useReducer(skillReducer, initialState);

  useEffect(() => {
    dispatch({ type: "actionTypes.fetch" });
    axios
      .get<Language[]>("https://api.github.com/users/FujieMasaki/repos")
      .then((response) => {
        const languageList: string[] = response.data.map((res) => res.language);
        // ['JavaScript', 'JavaScript', 'Ruby', null]な、かたちで返される
        const countedLanguageList = generateLanguageCountObj(languageList);
        dispatch({
          type: "actionTypes.success",
          payload: { languageList: countedLanguageList },
        });
      })

      .catch(() => {
        dispatch({ type: "actionTypes.error" });
      });
  }, []);
  const generateLanguageCountObj = (allLanguageList: string[]) => {
    const notNullLanguageList = allLanguageList.filter(
      (language: string) => language != null
    );
    const uniqueLanguageList = [...new Set(notNullLanguageList)];

    return uniqueLanguageList.map((item) => {
      return {
        language: item,
        count: allLanguageList.filter((language) => language === item).length,
      };
    });
  };
  const converseCountToPercentage = (count: number): number => {
    if (count > 10) {
      return 10;
    }
    return count * 10;
  };

  const sortedLanguageList = () =>
    state.languageList?.sort(
      (firstLang, nextLang) => nextLang.count - firstLang.count
    );
  // countが多い、降順にならべられる。
  // state.languageListには{language: 'TypeScript', count: 8},{language: 'Ruby', count: 5} が入ってくる

  return [sortedLanguageList, state.requestState, converseCountToPercentage];
};
