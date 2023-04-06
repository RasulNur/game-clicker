import React, { useContext } from "react";
import { context } from "../context";

const Button = ({ boardSize, text }) => {
    const {
        handleBoardSize,
        setTime,
        setScorePC,
        setScoreUser,
        setIsWin,
        setIsPlaying,
        setIsClicked,
        setIsHitted,
        setWinMessage,
        setRandomN,

        setIntervalMin,
        setIntervalMax,
    } = useContext(context);

    const handleClickLevel = (boardSize) => {
        handleBoardSize(boardSize);

        if (boardSize === 16) {
            setIntervalMin(1000);
            setIntervalMax(1500);
        } else if (boardSize === 36) {
            setIntervalMin(500);
            setIntervalMax(1200);
        } else if (boardSize === 60) {
            setIntervalMin(400);
            setIntervalMax(1000);
        }
        setIsPlaying(false);
        setTime(60);
        setIsHitted(false);
        setIsClicked(false);
        setIsWin({ whoWin: "", bool: false });
        setScorePC(0);
        setScoreUser(0);
        setRandomN({ prev: null, curr: null });
        setWinMessage(null);
    };

    return (
        <>
            <button
                className="app__btn"
                type="button"
                onClick={() => handleClickLevel(boardSize)}>
                {text}
            </button>
        </>
    );
};

export default Button;
