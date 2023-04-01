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
    } = useContext(context);

    const handleClickLevel = (boardSize) => {
        handleBoardSize(boardSize);
        setIsPlaying(false);
        setTime(60);
        setIsHitted(false);
        setIsClicked(false);
        setIsWin({ whoWin: "", bool: false });
        setScorePC(0);
        setScoreUser(0);
        setTimeout(() => {
            setIsPlaying(true);
        }, 10);

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
