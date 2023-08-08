import { FC, CSSProperties } from "react";
import styled from "styled-components";
import { IScoreBarProps, IScoreInputProps } from "../types/game.types";
import { useGame } from "../hooks/useGame";

const ScoreInput = styled.input.attrs<IScoreInputProps>(
    ({ maxscore, score }) => ({
        type: "range",
        min: 0,
        max: maxscore,
        value: score,
        disabled: true,
        className: "app__score-bar",
    })
)`
    height: 25px;

    &::-webkit-slider-thumb {
        box-shadow: -100px 0 0 100px ${({ color }) => color};
    }
`;

const ScoreBar: FC<IScoreBarProps> = ({ score, text, color }) => {
    const { maxScore } = useGame();

    const appBarStyles: CSSProperties = {
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
    };

    return (
        <div
            className={text === "You" ? "app__player-bar" : "app__pc-bar"}
            style={appBarStyles}>
            <div className="app__bar">
                <ScoreInput maxscore={maxScore} score={score} color={color} />
            </div>

            <div className="app__bar-text">{text}</div>
        </div>
    );
};

export default ScoreBar;
