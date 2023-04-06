import React, { useContext } from "react";
import styled from "styled-components";
import { context } from "../context";

const ScoreBar = ({ score, text, color }) => {
    const { board, maxScore } = useContext(context);

    const appBarStyles = {
        transform: `${board.length === 60 ? "" : "rotate(-90deg)"}`,
    };

    const appBarTextStylesUser = {
        left: "83px",
    };
    const appBarTextStylesPC = {
        right: "86px",
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
        height: ${board.length === 60 ? "30px" : "30px"};

        &::-webkit-slider-thumb {
            box-shadow: -100px 0 0 100px ${color};
        }
    `;

    return (
        <div className="app__bar-wrapper">
            <div className="app__bar" style={appBarStyles}>
                <ScoreInput />
            </div>
            {board.length !== 60 ? (
                <div
                    className="app__bar-text"
                    style={
                        text === "You"
                            ? appBarTextStylesUser
                            : appBarTextStylesPC
                    }>
                    {text}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default ScoreBar;
