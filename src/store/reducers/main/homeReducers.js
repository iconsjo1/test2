import { homeReducersTypes } from "../../../services";

const INITIAL_STATE = {
    news: null,
    dismissed: false
}

const {
    SET_ALL_NEWS,
    SET_MODAL_DISMISSED
} = homeReducersTypes;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ALL_NEWS:
            return { ...state, news: action.payload };
        case SET_MODAL_DISMISSED:
            return { ...state, dismissed: action.payload };
        default:
            return state;
    }
};