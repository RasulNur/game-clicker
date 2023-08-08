import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./game/gameSlice";

export const store = configureStore({
    reducer: { game: gameReducer },
    middleware: (getDefauldMiddleware) =>
        getDefauldMiddleware({ serializableCheck: false }),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
