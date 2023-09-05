import { themeReducersTypes } from "../../services";
import { setColors } from "../../services";

const {
    SET_THEME
} = themeReducersTypes

export const setTheme = (theme) => {
    setColors(theme);
    return {
        type: SET_THEME,
        payload: theme
    }
};