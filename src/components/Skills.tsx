import { useEffect, useReducer } from "react";
import axios from "axios";
import {
  skillReducer,
  initialState,
  actionTypes,
} from "../reducers/skillReducer";
import { requestStates } from "../constants";
import Circle from "react-circle";
import { stringify } from "querystring";

type Language = {
  language: string;
  count?: number;
  private?: boolean;
};

type dispatch = {
  type: string;
};

export const Skills = () => {
  // stateはlanguageListとrequestStateを初期化している
  // dispatchはaction
  // initialStateは初期ステート
  const [state, dispatch] = useReducer(skillReducer, initialState);
  console.log(state);
  useEffect(() => {
    dispatch({ type: actionTypes.fetch });
    axios
      .get<Language[]>("https://api.github.com/users/FujieMasaki/repos")
      .then((response) => {
        const languageList = response.data.map((res) => res.language);
        // ['JavaScript', 'JavaScript', 'Ruby', null]な、かたちで返される
        const countedLanguageList = generateLanguageCountObj(languageList);
        dispatch({
          type: actionTypes.success,
          payload: { languageList: countedLanguageList },
        });
      })
      .catch(() => {
        dispatch({ type: actionTypes.error });
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

  const converseCountToPercentage = (count: number) => {
    if (count > 10) {
      return 10;
    }
    return count * 10;
  };

  const sortedLanguageList = () =>
    state.languageList.sort(
      (firstLang, nextLang) => nextLang.count - firstLang.count
    );

  return (
    <div id="skills">
      <div className="container">
        <div className="heading">
          <h2>Skills</h2>
        </div>
        <div className="skills-container">
          {
            (state.requestState = requestStates.loading && (
              <p className="description">取得中</p>
            ))
          }
          {
            (state.requestState =
              state.requestState.success &&
              sortedLanguageList.map((item, index) => (
                <div key={index}>
                  <p className="description">
                    <strong>{item.language}</strong>
                  </p>
                  <Circle
                    animate
                    progress={converseCountToPercentage(item.count)}
                  />
                </div>
              )))
          }
          {
            (state.requestState = requestStates.error && (
              <p className="description">エラーが発生しました</p>
            ))
          }
        </div>
      </div>
    </div>
  );
};
