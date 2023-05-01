import { useContext } from "react";
import Board from "./components/Board";
import "./App.css";
import TimerIcon from "./icons/timer.svg";
import TimeBar from "./components/TimeBar";
import { context } from "./context";
import ScoreBar from "./components/ScoreBar";

import ScoreTable from "./components/ScoreTable";

function App() {
    const {
        board,
        scorePC,
        scoreUser,
        winMessage,
        setIsPlaying,
        setTime,
        setIsHitted,
        setIsClicked,
        setIsWin,
        setScorePC,
        setScoreUser,
        setRandomN,
        setWinMessage,
        setIsTimeOver,
        finalScore,
        setFinalScore,
    } = useContext(context);

    const rowStyles = {
        gridTemplateAreas: `
		". . . start-btn start-btn . . ."
		". stats stats stats stats stats stats ."
		". board board board board board board ."
		". time-bar time-bar time-bar time-bar time-bar time-bar ."`,
    };
    const rowStyles36 = {
        gridTemplateAreas: `
		". . . start-btn start-btn . . ."
				". stats stats stats stats stats stats ."
				". board board board board board board ."
				". time-bar time-bar time-bar time-bar time-bar time-bar ."`,
    };

    const rowStyles60 = {
        gridTemplateAreas: `". . . start-btn start-btn . . ."
				". stats stats stats stats stats stats ."
				"board board board board board board board board"
				". time-bar time-bar time-bar time-bar time-bar time-bar ."`,
    };

    const handlePlay = () => {
        setIsPlaying(false);
        setTime(60);
        setIsHitted(false);
        setIsClicked(false);
        setIsWin({ whoWin: "", bool: false });
        setScorePC(0);
        setScoreUser(0);
        setRandomN({ prev: null, curr: null });
        setWinMessage(null);
        setIsTimeOver(false);
        setFinalScore(0);
        setTimeout(() => {
            setIsPlaying(true);
        }, 1);
    };

    return (
        <div className="app">
            <div
                className="app__row"
                style={
                    board.length === 60
                        ? rowStyles60
                        : board.length === 36
                        ? rowStyles36
                        : rowStyles
                }>
                <button className="app__start-btn" onClick={handlePlay}>
                    Start
                </button>
                <div className="app__user-stats">
                    <ScoreBar
                        score={scoreUser}
                        text={"You"}
                        color={"#b4ffb2"}
                    />
                    <div className="app__final-score">{finalScore}</div>
                    <ScoreBar score={scorePC} text={"PC"} color={"#ff8989"} />
                </div>
                <div className="app__board-wrapper">
                    <Board />
                </div>

                <div className="app__timer-bar-wrapper">
                    <img
                        src={TimerIcon}
                        alt="Time icon"
                        className="app__timer-icon"
                    />

                    <TimeBar />
                </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "25px" }}>
                {winMessage && winMessage}
            </div>

            <ScoreTable />
        </div>
    );
}

export default App;
