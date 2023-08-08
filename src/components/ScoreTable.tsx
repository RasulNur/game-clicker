import { FC } from "react";
import { useGame } from "../hooks/useGame";

export const ScoreTable: FC = () => {
    const { usersScores } = useGame();

    return (
        <div className="app__score-list-wrapper">
            <h3 className="app__score-list-heading">Top scores</h3>
            <ol className="app__score-list">
                {usersScores
                    ? usersScores.map((el, id) => {
                          return (
                              <li className="app__score-list-item" key={id}>
                                  {el.UserName} - {el.UserScore}
                              </li>
                          );
                      })
                    : null}
            </ol>
        </div>
    );
};
