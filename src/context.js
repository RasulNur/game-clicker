import React, { createContext, useEffect, useState } from "react";
import Board from "./components/Board";
import audioVoice from "./audio/click-sound.mp3";
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
    const [isWin, setIsWin] = useState({
        whoWin: "",
        bool: false,
    });
    const maxScore = 20;
    let audio = new Audio(audioVoice);

    const handleBoardSize = (size) => {
        setBoard(Array(size).fill(""));
    };

    const handleHitClick = (i) => {
        setIsClicked(true);
        setIsHitted(i === randomN.curr);

        if (time >= 1 && isWin.bool === false) {
            if (i === randomN.curr && !isWin.bool) {
                audio.play();
                setScoreUser((prev) => prev + 1);
                setRandomN({ prev: null, curr: null });
                handleWinDetect();
            } else {
                setIsClicked(false);
                handleWinDetect();
            }
        }
    };

    useEffect(() => {
        handleHitClick();
        handleWinDetect();
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
            handleWinDetect();
        }
    }, [randomN.curr]);

    const handleWinDetect = () => {
        if (scoreUser === maxScore && scorePC < maxScore) {
            setIsWin({ whoWin: "User", bool: true });
            handleWinMessage();
            setIsPlaying(false);
        } else if (scorePC === maxScore && scoreUser < maxScore) {
            setIsWin({ whoWin: "PC", bool: true });
            handleWinMessage();
            setIsPlaying(false);
        } else if (time <= 0 && scorePC > scoreUser) {
            setIsWin({ whoWin: "PC", bool: true });
            handleWinMessage();
        } else if (time <= 0 && scorePC < scoreUser) {
            setIsWin({ whoWin: "User", bool: true });
            handleWinMessage();
        }
    };

    const handleWinMessage = () => {
        if (isWin && isWin.bool === true) {
            setTime(0);
            setWinMessage(`${isWin.whoWin} wins. To play again choose level`);
        }
    };

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
                handleBoardSize,
                scoreUser,
                setScoreUser,
                scorePC,
                setScorePC,
                setIsWin,
                boardTimer,
                setBoardTimer,
                isClicked,
                setIsClicked,
                isHitted,
                setIsHitted,
                handleWinDetect,
                handleWinMessage,
                winMessage,
                setWinMessage,
                maxScore,
                intervalMin,
                setIntervalMin,
                intervalMax,
                setIntervalMax,
            }}>
            {children}
        </context.Provider>
    );
};

export { context, ContextProvider };
