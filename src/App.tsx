import { CSSProperties, FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Board from "./components/Board";
import TimeBar from "./components/TimeBar";
import ScoreBar from "./components/ScoreBar";
import { ScoreTable } from "./components/ScoreTable";
import TimerIcon from "./icons/timer.svg";
import audioVoice from "./audio/click-sound.mp3";
import {
    setAddedPoints,
    setBoard,
    setIntervalMax,
    setIntervalMin,
    setIsClicked,
    setIsPlaying,
    setScorePC,
    setScoreUser,
    setTime,
    setUsersScores,
} from "./store/game/gameSlice";

import "./App.css";
import { IIsWin, IRandomN, IUserScore } from "./types/game.types";
import { useGame } from "./hooks/useGame";

const App: FC = () => {
    const [winMessage, setWinMessage] = useState<string | null>(null);
    const [isWin, setIsWin] = useState<IIsWin>({ whoWin: "", bool: false });
    const [isTimeOver, setIsTimeOver] = useState<boolean>(false);
    const [isHitted, setIsHitted] = useState<boolean>(false);
    const [finalScore, setFinalScore] = useState<number>(0);
    const [randomN, setRandomN] = useState<IRandomN>({
        prev: null,
        curr: null,
    });

    const maxScore: number = 60;
    const audio = new Audio(audioVoice);
    const dispatch = useDispatch();

    const { board, scorePC, scoreUser, time, addedPoints, isClicked } =
        useGame();

    const handleBoardSize = (size: number): void => {
        dispatch(setBoard(Array(size).fill("")));
    };

    const handleHitClick = (i?: number): void => {
        dispatch(setIsClicked(true));
        setIsHitted(i === randomN.curr);

        if (time >= 0 && isWin.bool === false) {
            if (i === randomN.curr && !isWin.bool) {
                audio.play();
                dispatch(setScoreUser(scoreUser + 1));
                setFinalScore((prev: number) => prev + addedPoints);
                setRandomN({ prev: null, curr: null });
                handleWinDetect();
            } else {
                dispatch(setIsClicked(false));
                handleWinDetect();
            }
        }
    };

    const handleWinDetect = (): void => {
        if (scoreUser === maxScore && scorePC < maxScore) {
            setIsWin({ whoWin: "User", bool: true });
            postScore();
            dispatch(setIsPlaying(false));
        } else if (scorePC === maxScore && scoreUser < maxScore) {
            setIsWin({ whoWin: "PC", bool: true });
            dispatch(setIsPlaying(false));
        } else if (isTimeOver && scorePC > scoreUser) {
            setIsWin({ whoWin: "PC", bool: true });
            dispatch(setIsPlaying(false));
        } else if (isTimeOver && scoreUser > scorePC) {
            setIsWin({ whoWin: "User", bool: true });
            postScore();
            dispatch(setIsPlaying(false));
        } else if (isTimeOver && scoreUser === scorePC) {
            setIsWin({ whoWin: "Draw", bool: true });
            dispatch(setIsPlaying(false));
        }
    };

    const handleWinMessage = (): void => {
        if (isWin.whoWin === "Draw") {
            setWinMessage(`${isWin.whoWin}. To play again press start`);
        } else if (isWin.bool) {
            dispatch(setTime(0));
            setWinMessage(`${isWin.whoWin} wins. To play again press start`);
        }
    };

    // const postScore = async () => {
    //     // const filteredScores = await fetchScores();
    //     const res = await axios.get<IUserScore[]>(
    //         "https://sheet.best/api/sheets/6f587796-9494-4570-9b9b-8674887b2eef"
    //     );
    //     const filteredScores = res.data
    //         .sort((a, b) => {
    //             return b.UserScore - a.UserScore;
    //         })
    //         .slice(0, 10);

    //     if (isWin.whoWin === "User") {
    //         axios
    //             .post(
    //                 "https://sheet.best/api/sheets/6f587796-9494-4570-9b9b-8674887b2eef",
    //                 finalScore >
    //                     filteredScores[filteredScores.length].UserScore ||
    //                     filteredScores.length < 10
    //                     ? {
    //                           UserScore: finalScore,
    //                           UserName: prompt(
    //                               "You're in the top 10. Enter your name",
    //                               "Super unknown username"
    //                           )!.substring(0, 20),
    //                       }
    //                     : {
    //                           UserScore: finalScore,
    //                       }
    //             )
    //             .then(() => {
    //                 getScores();
    //             });
    //     }
    // };

    // const getScores = async () => {
    //     const res = await axios.get<IUserScore[]>(
    //         "https://sheet.best/api/sheets/6f587796-9494-4570-9b9b-8674887b2eef"
    //     );
    //     const filteredScores = res.data.sort((a, b) => {
    //         return b.UserScore - a.UserScore;
    //     });

    //     dispatch(setUsersScores(filteredScores.slice(0, 10)));
    // };

    const postScore = async () => {
        const res = await axios.get<IUserScore[]>(
            "https://sheet.best/api/sheets/6f587796-9494-4570-9b9b-8674887b2eef"
        );

        const filteredScores = res.data
            .sort((a, b) => {
                return Number(b.UserScore) - Number(a.UserScore);
            })
            .slice(0, 10);

        if (isWin.whoWin === "User") {
            if (
                finalScore >
                    parseInt(
                        filteredScores[filteredScores.length - 1].UserScore
                    ) ||
                filteredScores.length < 10
            )
                axios
                    .post(
                        "https://sheet.best/api/sheets/6f587796-9494-4570-9b9b-8674887b2eef",

                        {
                            UserScore: finalScore,
                            UserName: prompt(
                                "You're in the top 10. Enter your name",
                                "Unknown"
                            )!.substring(0, 20),
                        }
                    )
                    .then(() => {
                        getScores();
                    });
        }
    };

    const getScores = async () => {
        const res = await axios.get<IUserScore[]>(
            "https://sheet.best/api/sheets/6f587796-9494-4570-9b9b-8674887b2eef"
        );

        const filteredScores = res.data.sort((a, b) => {
            return Number(b.UserScore) - Number(a.UserScore);
        });
        dispatch(setUsersScores(filteredScores.slice(0, 10)));
    };

    useEffect(() => {
        handleHitClick();
        if (isHitted || isClicked) {
            return;
        }
        if (
            !isClicked &&
            !isHitted &&
            !isWin.bool &&
            randomN.prev !== null &&
            randomN.curr !== null
        ) {
            dispatch(setScorePC(scorePC + 1));
        }
    }, [randomN.curr]);

    useEffect(() => {
        getScores();
    }, [isWin]);

    useEffect(() => {
        handleWinDetect();
        if (time === 0) {
            setIsTimeOver(true);
        }
    }, [time, scoreUser, scorePC]);

    useEffect(() => {
        handleWinMessage();
    }, [isWin.bool, isWin.whoWin]);

    const setIntervalRange = (min: number, max: number) => {
        dispatch(setIntervalMin(min));
        dispatch(setIntervalMax(max));
    };

    const changeLevel = () => {
        if (time >= 40 && time <= 60) {
            setIntervalRange(1000, 1500);
            dispatch(setAddedPoints(10));
            handleBoardSize(16);
        } else if (time < 40 && time >= 20) {
            setIntervalRange(500, 1200);
            dispatch(setAddedPoints(30));
            handleBoardSize(36);
        } else {
            setIntervalRange(400, 1000);
            dispatch(setAddedPoints(50));
            handleBoardSize(60);
        }
    };

    useEffect(() => {
        changeLevel();
    }, [time]);

    const rowStyles: CSSProperties = {
        gridTemplateAreas: `
		". . . start-btn start-btn . . ."
		". stats stats stats stats stats stats ."
		". board board board board board board ."
		". time-bar time-bar time-bar time-bar time-bar time-bar ."`,
    };
    const rowStyles36: CSSProperties = {
        gridTemplateAreas: `
		". . . start-btn start-btn . . ."
				". stats stats stats stats stats stats ."
				". board board board board board board ."
				". time-bar time-bar time-bar time-bar time-bar time-bar ."`,
    };

    const rowStyles60: CSSProperties = {
        gridTemplateAreas: `". . . start-btn start-btn . . ."
				". stats stats stats stats stats stats ."
				"board board board board board board board board"
				". time-bar time-bar time-bar time-bar time-bar time-bar ."`,
    };

    const handlePlay = () => {
        dispatch(setIsPlaying(false));
        dispatch(setTime(60));
        setIsHitted(false);
        dispatch(setIsClicked(false));
        setIsWin({ whoWin: "", bool: false });
        dispatch(setScorePC(0));
        dispatch(setScoreUser(0));
        setRandomN({ prev: null, curr: null });
        setWinMessage(null);
        setIsTimeOver(false);
        setFinalScore(0);
        setTimeout(() => {
            dispatch(setIsPlaying(true));
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
                <button className="app__start-btn" onClick={() => handlePlay()}>
                    Start
                </button>
                <div className="app__user-stats">
                    <ScoreBar
                        score={scoreUser}
                        text={"You"}
                        color={"#b4ffb2"}
                    />
                    <div className="app__final-score">
                        <div style={{ visibility: "hidden" }}>1</div>
                        <p>{finalScore}</p>
                    </div>
                    <ScoreBar score={scorePC} text={"PC"} color={"#ff8989"} />
                </div>
                <div className="app__board-wrapper">
                    <Board
                        randomN={randomN}
                        setRandomN={setRandomN}
                        handleHitClick={handleHitClick}
                        handleWinDetect={handleWinDetect}
                    />
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
};

export default App;
