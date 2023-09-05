import { themeReducersTypes } from '../../../services';

const INITIAL_STATE = {
    themeColor: 'light'
}

const {
    SET_THEME
} = themeReducersTypes;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_THEME:
            return { ...state, themeColor: action.payload }
        default:
            return state;
    }
};