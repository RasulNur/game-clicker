import React, { createContext, useEffect, useState } from "react";
const context = createContext();

const ContextProvider = ({ children }) => {
    const [board, setBoard] = useState(Array(16).fill(""));
    const [time, setTime] = useState(60);
    const [isPlaying, setIsPlaying] = useState(false);
    const [randomN, setRandomN] = useState(1);
    const [scoreUser, setScoreUser] = useState(0);
    const [scorePC, setScorePC] = useState(0);
    const [boardTimer, setBoardTimer] = useState(null);
    const [isClicked, setIsClicked] = useState(true);
    const [isHitted, setIsHitted] = useState(false);
    const [winMessage, setWinMessage] = useState(null);
    const [isWin, setIsWin] = useState({
        whoWin: "",
        bool: false,
    });
    const handleBoardSize = (size) => {
        setBoard(Array(size).fill(""));
    };

    const handleHitClick = (i) => {
        setIsClicked(true);
        setIsHitted(i === randomN);

        if (time >= 1 && isWin.bool === false) {
            if (i === randomN && !isWin.bool) {
                setScoreUser((prev) => prev + 1);
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
        if (!isClicked && !isHitted && !isWin.bool) {
            setScorePC((prev) => prev + 1);
            handleWinDetect();
        }
    }, [randomN]);

    const handleWinDetect = () => {
        if (scoreUser === 30 && scorePC < 30) {
            setIsWin({ whoWin: "User", bool: true });
            handleWinMessage();
            setIsPlaying(false);
        } else if (scorePC === 30 && scoreUser < 30) {
            setIsWin({ whoWin: "PC", bool: true });
            handleWinMessage();
            setIsPlaying(false);
        } else if (!isPlaying && scorePC > scoreUser) {
            setIsWin({ whoWin: "PC", bool: true });
            handleWinMessage();
        } else if (!isPlaying && scorePC < scoreUser) {
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
            }}>
            {children}
        </context.Provider>
    );
};

export { context, ContextProvider };
