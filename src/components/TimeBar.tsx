import { useEffect, FC } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setIsPlaying, setTime } from "../store/game/gameSlice";
import { IColors, IInputProps } from "../types/game.types";
import { useGame } from "../hooks/useGame";

const Input = styled.input.attrs<IInputProps>(({ time }) => ({
    type: "range",
    min: 0,
    max: 60,
    value: time,
    disabled: true,
    className: "time-bar__input",
}))`
    &::-webkit-slider-thumb {
        box-shadow: -500px 0 0 500px
            ${({ time, colors }) => {
                if (time && colors) {
                    if (time >= 40 && time <= 60) {
                        return colors.green;
                    } else if (time < 40 && time >= 20) {
                        return colors.yellow;
                    } else {
                        return colors.red;
                    }
                }
            }};
    }
`;

const TimeBar: FC = () => {
    const dispatch = useDispatch();

    const { time, isPlaying } = useGame();

    const colors: IColors = {
        red: "#ff8e77",
        green: "#adff77",
        yellow: "#ffd977",
    };

    useEffect(() => {
        let interval: NodeJS.Timer = setInterval(() => {
            if (isPlaying && time >= 0 && time <= 60) {
                dispatch(setTime(time - 1));
            } else if (time < 0) {
                dispatch(setIsPlaying(false));
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [time, isPlaying]);

    return (
        <div className="app__time-bar">
            <Input colors={colors} time={time} />
        </div>
    );
};

export default TimeBar;
