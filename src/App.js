import { useContext } from "react";
import Board from "./components/Board";
import "./App.css";
import TimerIcon from "./icons/timer.svg";
import TimeBar from "./components/TimeBar";
import { context } from "./context";
import ScoreBar from "./components/ScoreBar";
import Button from "./components/Button";

function App() {
    const { board, scorePC, scoreUser, winMessage, isPlaying, setIsPlaying } =
        useContext(context);

    const rowStyles = {
        gridTemplateAreas: `
		". . . start-btn start-btn . . ."
		". btns btns btns btns btns btns ."
		". p-bar board board board board pc-bar ."
		". time-bar time-bar time-bar time-bar time-bar time-bar ."`,
    };
    const rowStyles36 = {
        gridTemplateAreas: `
		". . . start-btn start-btn . . ."
				". btns btns btns btns btns btns ."
				"p-bar board board board board board board pc-bar"
				". time-bar time-bar time-bar time-bar time-bar time-bar ."`,
    };

    const rowStyles60 = {
        gridTemplateAreas: `". . . start-btn start-btn . . ."
				"p-bar p-bar btns btns btns btns pc-bar pc-bar"
				"board  board board board board  board board board"
				"time-bar time-bar time-bar time-bar time-bar time-bar time-bar time-bar"`,
    };

    const handlePlay = () => {
        setIsPlaying(true);
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
                <div className="app__btns">
                    <Button boardSize={16} text={"Easy"} />
                    <Button boardSize={36} text={"Medium"} />
                    <Button boardSize={60} text={"Hard"} />
                </div>

                <ScoreBar score={scoreUser} text={"You"} color={"#b4ffb2"} />
                <div className="app__board-wrapper">
                    <Board />
                </div>
                <ScoreBar score={scorePC} text={"PC"} color={"#ff8989"} />

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
        </div>
    );
}

export default App;
