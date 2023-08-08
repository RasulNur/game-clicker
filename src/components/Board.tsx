import { FC, CSSProperties, useEffect } from "react";
import MoneyIcon from "../icons/money.png";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
    setIsClicked,
    setScorePC,
    setScoreUser,
} from "../store/game/gameSlice";
import { IBoardProps } from "../types/game.types";
import { useGame } from "../hooks/useGame";

const Board: FC<IBoardProps> = ({
    handleHitClick,
    handleWinDetect,
    randomN,
    setRandomN,
}) => {
    const [boardTimer, setBoardTimer] = useState<number>(0);
    const dispatch = useDispatch();
    const { isPlaying, board, time, intervalMin, intervalMax } = useGame();

    const boardStyles: CSSProperties = {
        display: "grid",
        gridTemplateColumns: `repeat(${
            board.length === 16 ? 4 : board.length === 36 ? 6 : 10
        }, minmax(${board.length === 16 ? "90px, 97.5px" : "60px, 65px"}))`,

        gridTemplateRows: `repeat(${board.length === 16 ? 4 : 6}, ${
            board.length === 16 ? "90px" : "60px"
        })`,
    };

    const handleRandomPostion = (): number | null => {
        return time >= 0 ? Math.floor(Math.random() * board.length) : null;
    };

    const handleRandom = (max: number, min: number): number => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const handleRandomTime = (): void => {
        setBoardTimer(handleRandom(intervalMax, intervalMin));
    };

    useEffect(() => {
        let interval: NodeJS.Timer;
        if (isPlaying) {
            interval = setInterval(() => {
                handleWinDetect();
                handleRandomTime();

                if (isPlaying) {
                    dispatch(setIsClicked(false));

                    setRandomN((prevState) => ({
                        prev: prevState.curr,
                        curr: handleRandomPostion(),
                    }));

                    handleWinDetect();
                } else {
                    setRandomN({ prev: null, curr: null });
                    clearInterval(interval);
                    dispatch(setScorePC(0));
                    dispatch(setScoreUser(0));
                }
            }, boardTimer);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isPlaying, board.length, boardTimer]);

    return (
        <div className="app__board board" style={boardStyles}>
            {board.map((_: string, i: number) => {
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
