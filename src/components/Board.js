import React, { useContext, useEffect } from "react";
import MoneyIcon from "../icons/money.png";
import { context } from "../context";

const Board = () => {
    const {
        isPlaying,
        handleHitClick,
        randomN,
        setRandomN,
        board,
        time,
        boardTimer,
        setBoardTimer,
        setIsClicked,
        handleWinDetect,
    } = useContext(context);

    const boardStyles = {
        display: "grid",
        gridTemplateColumns: `repeat(${
            board.length === 16 ? 4 : board.length === 36 ? 6 : 10
        }, minmax(60px, 65px))`,
        gridTemplateRows: `repeat(${board.length === 16 ? 4 : 6}, 60px)`,
    };

    const handleRandomPostion = () => {
        return time >= 0 ? Math.floor(Math.random() * board.length) : null;
    };

    const handleRandomTime = (min, max) => {
        setBoardTimer(Math.floor(Math.random() * (max - min) + min * 1000));

        return boardTimer;
    };

    useEffect(() => {
        setRandomN(1);
        const interval = setInterval(
            () => {
                handleWinDetect();

                if (isPlaying) {
                    setIsClicked(false);
                    setRandomN(handleRandomPostion());
                    handleWinDetect();
                } else {
                    setRandomN(null);
                    clearInterval(interval);
                }
            },
            board.length === 60
                ? handleRandomTime(0.5, 2)
                : board.length === 36
                ? handleRandomTime(1, 3)
                : handleRandomTime(2, 5)
        );

        return () => {
            clearInterval(interval);
        };
    }, [isPlaying]);

    return (
        <div className="app__board board" style={boardStyles}>
            {board.map((el, i) => {
                return (
                    <button
                        className="board__square"
                        key={i}
                        type="button"
                        onClick={() => handleHitClick(i)}>
                        {randomN === i ? (
                            <img
                                className="app__money-icon"
                                src={MoneyIcon}
                                alt="Money icom"
                            />
                        ) : (
                            ""
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default Board;
