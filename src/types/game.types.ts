import { Dispatch, SetStateAction } from "react";

export interface IIsWin {
    whoWin: string;
    bool: boolean;
}
export interface IRandomN {
    prev: number | null;
    curr: number | null;
}
export interface IBoardProps {
    handleHitClick: (i: number) => void;
    handleWinDetect: () => void;
    randomN: IRandomN;
    setRandomN: Dispatch<SetStateAction<IRandomN>>;
}
export interface IScoreInputProps {
    maxscore?: number;
    score?: number;
    color?: string;
}

export interface IScoreBarProps {
    score: number;
    text: string;
    color: string;
}
export interface IInputProps {
    time?: number;
    colors?: IColors;
}

export interface IColors {
    red: string;
    green: string;
    yellow: string;
}
export interface IInitialState {
    board: string[];
    time: number;
    intervalMin: number;
    intervalMax: number;
    isPlaying: boolean;
    scoreUser: number;
    scorePC: number;
    isClicked: boolean;
    usersScores: IUserScore[];
    addedPoints: number;
    maxScore: number;
}
export interface IUserScore {
    UserScore: string;
    UserName: string;
}
