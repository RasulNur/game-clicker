import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { context } from "../context";

const TimeBar = () => {
    const { time, setTime, setIsPlaying } = useContext(context);
    const colors = { red: "#ff8e77", green: "#adff77", yellow: "#ffd977" };
    useEffect(() => {
        let interval = setInterval(() => {
            if (time >= 1 && time <= 60) {
                setTime(time - 1);
                setIsPlaying(true);
            } else if (time < 1) {
                setIsPlaying(false);
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [time]);

    const Input = styled.input.attrs({
        type: "range",
        min: 0,
        max: 60,
        defaultValue: time,
        disabled: true,
    })`
        &::-webkit-slider-thumb {
            box-shadow: -500px 0 0 500px
                ${time >= 40 && time <= 60
                    ? colors.green
                    : time < 40 && time >= 20
                    ? colors.yellow
                    : colors.red};
        }
    `;

    return (
        <div className="app__time-bar">
            <Input />
        </div>
    );
};

export default TimeBar;
