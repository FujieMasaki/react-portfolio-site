import { useEffect, useReducer } from "react";
import axios from "axios";
import {
  skillReducer,
  initialState,
  actionTypes,
} from "../reducers/skillReducer";

type Language = {
  language: string;
  count?: number;
  private?: boolean;
};

type actionTypes = {
  initial: string;
  fetch: string;
  success: string;
  error: string;
};
export const Skills = () => {
  const [state, dispatch] = useReducer<actionTypes>[](skillReducer, initialState);
  useEffect(() => {
    dispatch({type:actionTypes:fetch})
    axios
      .get<Language[]>("https://api.github.com/users/FujieMasaki/repos")
      .then((response) => {
        const languageList = response.data.map((res) => res.language);
        // ['JavaScript', 'JavaScript', 'Ruby', null]な、かたちで返される
        const countedLanguageList = generateLanguageCountObj(languageList);
        dispatch({ type: actionTypes.success, payload: { languageList: countedLanguageList } });
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

  return (
    <div id="skills">
      <div className="container">
        <div className="heading">
          <h2>Skills</h2>
        </div>
        <div className="skills-container"></div>
      </div>
    </div>
  );
};
