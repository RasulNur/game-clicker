import React, { useContext } from "react";
import styled from "styled-components";
import { context } from "../context";

const ScoreInput = styled.input.attrs((props) => ({
    type: "range",
    min: 0,
    max: props.maxScore,
    value: props.score,
    disabled: true,
    className: "app__score-bar",
}))`
    height: 25px;

    &::-webkit-slider-thumb {
        box-shadow: -100px 0 0 100px ${(props) => props.color};
    }
`;

const ScoreBar = ({ score, text, color }) => {
    const { board, maxScore } = useContext(context);

    const appBarStyles = {
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
    };

    return (
        <div
            className={text === "You" ? "app__player-bar" : "app__pc-bar"}
            style={appBarStyles}>
            <div className="app__bar">
                <ScoreInput
                    board={board}
                    maxScore={maxScore}
                    score={score}
                    color={color}
                />
            </div>

            <div className="app__bar-text">{text}</div>
        </div>
    );
};

export default ScoreBar;
