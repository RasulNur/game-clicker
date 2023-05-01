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
        setScorePC,
        setScoreUser,
        intervalMin,
        intervalMax,
    } = useContext(context);

    const boardStyles = {
        display: "grid",
        gridTemplateColumns: `repeat(${
            board.length === 16 ? 4 : board.length === 36 ? 6 : 10
        }, minmax(${board.length === 16 ? "90px, 97.5px" : "60px, 65px"}))`,

        gridTemplateRows: `repeat(${board.length === 16 ? 4 : 6}, ${
            board.length === 16 ? "90px" : "60px"
        })`,
    };

    const handleRandomPostion = () => {
        return time >= 0 ? Math.floor(Math.random() * board.length) : null;
    };

    const handleRandom = (max, min) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const handleRandomTime = () => {
        setBoardTimer(handleRandom(intervalMax, intervalMin));
    };

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                handleWinDetect();
                handleRandomTime();

                if (isPlaying) {
                    setIsClicked(false);
                    setRandomN((prev) => ({
                        prev: prev.curr,
                        curr: handleRandomPostion(),
                    }));

                    handleWinDetect();
                } else {
                    setRandomN({ prev: null, curr: null });
                    clearInterval(interval);
                    setScorePC(0);
                    setScoreUser(0);
                }
            }, boardTimer);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isPlaying, board.length, boardTimer]);

    return (
        <div className="app__board board" style={boardStyles}>
            {board.map((_, i) => {
                return (
                    <button
                        className="board__square"
                        key={i}
                        type="button"
                        onClick={() => handleHitClick(i)}>
                        {randomN.curr === i ? (
                            <img
                                className="app__money-icon"
                                src={MoneyIcon}
                                style={{
                                    width: `${
                                        board.length === 16 ? "60px" : "40px"
                                    }`,
                                    height: `${
                                        board.length === 16 ? "60px" : "40px"
                                    }`,
                                    padding: `${
                                        board.length === 16
                                            ? "15px 20px"
                                            : "10px"
                                    }`,
                                }}
                                draggable={false}
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
