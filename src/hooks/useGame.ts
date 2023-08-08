import { useTypedSelector } from "./useTypedSelector";

export const useGame = () => {
    const game = useTypedSelector((state) => state.game);
    return game;
};
