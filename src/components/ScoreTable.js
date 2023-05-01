import { useContext } from "react";
import { context } from "../context";

export default function ScoreTable() {
    const { usersScores } = useContext(context);

    return (
        <div className="app__score-list-wrapper">
            <h3 className="app__score-list-heading">Top scores</h3>
            <ol className="app__score-list">
                {usersScores
                    ? usersScores.map((el, id) => {
                          return (
                              <li className="app__score-list-item" key={id}>
                                  {el.UserScore}
                              </li>
                          );
                      })
                    : null}
            </ol>
        </div>
    );
}
