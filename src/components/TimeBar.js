import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { context } from "../context";

const Input = styled.input.attrs((props) => ({
    type: "range",
    min: 0,
    max: 60,
    value: props.time,
    disabled: true,
}))`
    &::-webkit-slider-thumb {
        box-shadow: -500px 0 0 500px
            ${(props) => {
                if (props.time >= 40 && props.time <= 60) {
                    return props.colors.green;
                } else if (props.time < 40 && props.time >= 20) {
                    return props.colors.yellow;
                } else {
                    return props.colors.red;
                }
            }};
    }
`;

const TimeBar = () => {
    const {
        time,
        setTime,
        setIsPlaying,
        isPlaying,
        boardSize,
        setAddedPoints,
    } = useContext(context);
    const colors = { red: "#ff8e77", green: "#adff77", yellow: "#ffd977" };

    useEffect(() => {
        let interval = setInterval(() => {
            if (isPlaying && time >= 0 && time <= 60) {
                setTime(time - 1);
            } else if (time < 0) {
                setIsPlaying(false);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [time, isPlaying]);

    return (
        <div className="app__time-bar">
            <Input
                colors={colors}
                time={time}
                boardSize={boardSize}
                setAddedPoints={setAddedPoints}
            />
        </div>
    );
};

export default TimeBar;
