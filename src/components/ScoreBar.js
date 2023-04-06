import React, { useContext } from "react";
import styled from "styled-components";
import { context } from "../context";

const ScoreBar = ({ score, text, color }) => {
    const { board, maxScore } = useContext(context);

    const appBarStyles = {
        transform: `${board.length === 60 ? "" : "rotate(-90deg)"}`,
        width: `${board.length === 60 ? "" : "width: 230px"}`,
        justifySelf: "center",
    };
    const appWrapperStyles = {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
    };

    const ScoreInput = styled.input.attrs({
        type: "range",
        min: 0,
        max: maxScore,
        defaultValue: score,
        disabled: true,
        className: "app_score-bar",
    })`
        width: ${board.length === 60 ? "" : "190px"};
        height: 30px;

        &::-webkit-slider-thumb {
            box-shadow: -100px 0 0 100px ${color};
        }
    `;

    return (
        <div
            className={text === "You" ? "app__player-bar" : "app__pc-bar"}
            style={appBarStyles}>
            <div
                className="app__bar-wrapper"
                style={board.length !== 60 ? appWrapperStyles : null}>
                <div className="app__bar">
                    <ScoreInput />
                </div>
                {board.length !== 60 ? (
                    <div className="app__bar-text">{text}</div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default ScoreBar;
