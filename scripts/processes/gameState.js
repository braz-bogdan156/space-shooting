export let isGamePaused = true;

export const setGamePaused = (value) => {
    isGamePaused = value;
};

export const getGamePaused = () => {
    return isGamePaused;
}