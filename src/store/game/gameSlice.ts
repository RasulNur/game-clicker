import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { IInitialState, IUserScore } from "../../types/game.types";

const initialState: IInitialState = {
    board: Array(16).fill(""),
    time: 60,
    intervalMin: 1000,
    intervalMax: 1500,
    isPlaying: false,
    scoreUser: 0,
    scorePC: 0,
    isClicked: true,
    usersScores: [],
    addedPoints: 10,
    maxScore: 60,
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setBoard: (state, action: PayloadAction<string[]>) => {
            state.board = action.payload;
        },

        setTime: (state, action: PayloadAction<number>) => {
            state.time = action.payload;
        },

        setIntervalMin: (state, action: PayloadAction<number>) => {
            state.intervalMin = action.payload;
        },

        setIntervalMax: (state, action: PayloadAction<number>) => {
            state.intervalMax = action.payload;
        },

        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },

        setScoreUser: (state, action: PayloadAction<number>) => {
            state.scoreUser = action.payload;
        },

        setScorePC: (state, action: PayloadAction<number>) => {
            state.scorePC = action.payload;
        },

        setIsClicked: (state, action: PayloadAction<boolean>) => {
            state.isClicked = action.payload;
        },

        setUsersScores: (state, action: PayloadAction<IUserScore[]>) => {
            state.usersScores = action.payload;
        },
        setAddedPoints: (state, action: PayloadAction<number>) => {
            state.addedPoints = action.payload;
        },
        // handleBoardSize: (state, action: PayloadAction<number>) => {
        //     console.log(action);

        //     setBoard(Array(action.payload).fill(""));
        // },
        // setIntervalRange: (state, action: PayloadAction<number[]>) => {
        //     console.log(action);
        //     setIntervalMin(action.payload[0]);
        //     setIntervalMax(action.payload[1]);
        // },
        // changeLevel: (state) => {
        //     if (state.time >= 40 && state.time <= 60) {
        //         setIntervalRange([1000, 1500]);
        //         setAddedPoints(10);
        //         handleBoardSize(16);
        //     } else if (state.time < 40 && state.time >= 20) {
        //         setIntervalRange([500, 1200]);
        //         setAddedPoints(30);
        //         handleBoardSize(36);
        //     } else {
        //         setIntervalRange([400, 1000]);
        //         setAddedPoints(50);
        //         handleBoardSize(60);
        //     }
        // },
    },
    extraReducers: (builder) => {},
});

export const {
    setBoard,
    setTime,
    setIntervalMin,
    setIntervalMax,
    setIsPlaying,
    setScoreUser,
    setScorePC,
    setIsClicked,
    setUsersScores,
    setAddedPoints,
    // handleBoardSize,
    // changeLevel,
    // setIntervalRange,
} = gameSlice.actions;
export default gameSlice.reducer;
