import React, { createContext, useEffect, useState } from "react";
import audioVoice from "./audio/click-sound.mp3";
import axios from "axios";
const context = createContext();

const ContextProvider = ({ children }) => {
    const [board, setBoard] = useState(Array(16).fill(""));
    const [time, setTime] = useState(60);
    const [intervalMin, setIntervalMin] = useState(1000);
    const [intervalMax, setIntervalMax] = useState(1500);
    const [isPlaying, setIsPlaying] = useState(false);
    const [randomN, setRandomN] = useState({ prev: null, curr: null });
    const [scoreUser, setScoreUser] = useState(0);
    const [scorePC, setScorePC] = useState(0);
    const [boardTimer, setBoardTimer] = useState(0);
    const [isClicked, setIsClicked] = useState(true);
    const [isHitted, setIsHitted] = useState(false);
    const [winMessage, setWinMessage] = useState(null);
    const [usersScores, setUsersScores] = useState();
    const [isWin, setIsWin] = useState({
        whoWin: "",
        bool: false,
    });
    const [addedPoints, setAddedPoints] = useState(10);
    const [finalScore, setFinalScore] = useState(0);
    const maxScore = 60;
    let audio = new Audio(audioVoice);
    const [isTimeOver, setIsTimeOver] = useState(false);

    const handleBoardSize = (size) => {
        setBoard(Array(size).fill(""));
    };

    const handleHitClick = (i) => {
        setIsClicked(true);
        setIsHitted(i === randomN.curr);

        if (time >= 0 && isWin.bool === false) {
            if (i === randomN.curr && !isWin.bool) {
                audio.play();
                setScoreUser((prev) => prev + 1);
                setFinalScore((prev) => prev + addedPoints);
                setRandomN({ prev: null, curr: null });
                handleWinDetect();
            } else {
                setIsClicked(false);
                handleWinDetect();
            }
        }
    };

    const handleWinDetect = () => {
        if (scoreUser === maxScore && scorePC < maxScore) {
            setIsWin({ whoWin: "User", bool: true });
            postScore();
            setIsPlaying(false);
        } else if (scorePC === maxScore && scoreUser < maxScore) {
            setIsWin({ whoWin: "PC", bool: true });
            setIsPlaying(false);
        } else if (isTimeOver && scorePC > scoreUser) {
            setIsWin({ whoWin: "PC", bool: true });

            setIsPlaying(false);
        } else if (isTimeOver && scoreUser > scorePC) {
            setIsWin({ whoWin: "User", bool: true });
            postScore();
            setIsPlaying(false);
        } else if (isTimeOver && scoreUser === scorePC) {
            setIsWin({ whoWin: "Draw", bool: true });
            setIsPlaying(false);
        }
    };

    const handleWinMessage = () => {
        if (isWin.whoWin === "Draw") {
            setWinMessage(`${isWin.whoWin}. To play again press start`);
        } else if (isWin.bool) {
            setTime(0);
            setWinMessage(`${isWin.whoWin} wins. To play again press start`);
        }
    };

    const postScore = () => {
        const postData = {
            UserScore: finalScore,
        };
        if (isWin.whoWin === "User") {
            axios
                .post(
                    "https://sheet.best/api/sheets/6b681526-2a08-40a6-8161-3a3a2bdc2a38",
                    postData
                )
                .then((res) => {
                    console.log(res);
                    getScores();
                });
        }
    };

    const getScores = async () => {
        const res = await axios.get(
            "https://sheet.best/api/sheets/6b681526-2a08-40a6-8161-3a3a2bdc2a38"
        );
        const filteredScores = res.data.sort((a, b) => {
            return b.UserScore - a.UserScore;
        });
        setUsersScores(filteredScores.slice(0, 10));
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
            setScorePC((prev) => prev + 1);
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

    const setIntervalRange = (min, max) => {
        setIntervalMin(min);
        setIntervalMax(max);
    };

    const changeLevel = () => {
        if (time >= 40 && time <= 60) {
            setIntervalRange(1000, 1500);
            setAddedPoints(10);
            handleBoardSize(16);
        } else if (time < 40 && time >= 20) {
            setIntervalRange(500, 1200);
            setAddedPoints(30);
            handleBoardSize(36);
        } else {
            setIntervalRange(400, 1000);
            setAddedPoints(50);
            handleBoardSize(60);
        }
    };

    useEffect(() => {
        changeLevel();
    }, [time]);

    return (
        <context.Provider
            value={{
                time,
                setTime,
                isPlaying,
                setIsPlaying,
                handleHitClick,
                randomN,
                setRandomN,
                board,
                scoreUser,
                setScoreUser,
                scorePC,
                setScorePC,
                setIsWin,
                boardTimer,
                setBoardTimer,
                setIsClicked,
                setIsHitted,
                handleWinDetect,
                winMessage,
                setWinMessage,
                maxScore,
                intervalMin,
                intervalMax,
                setAddedPoints,
                setIsTimeOver,
                usersScores,
                finalScore,
            }}>
            {children}
        </context.Provider>
    );
};

export { context, ContextProvider };
