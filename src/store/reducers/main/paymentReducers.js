import { paymentsReducersTypes } from "../../../services";

const {
    SET_ALL_CARDS,
    SET_SELECTED_CARD,
    SET_CARD_HOLDER,
    SET_CARD_NUMBER,
    SET_EXPIRY,
    SET_CVV_NUMBER,
} = paymentsReducersTypes;

const INITIAL_STATE = {
    allCards: null,
    selectedCard: -1,
    cardHolder: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ALL_CARDS:
            return { ...state, allCards: action.payload }
        case SET_SELECTED_CARD:
            return { ...state, selectedCard: action.payload }
        case SET_CARD_HOLDER:
            return { ...state, cardHolder: action.payload }
        case SET_CARD_NUMBER:
            return { ...state, cardNumber: action.payload }
        case SET_EXPIRY:
            return { ...state, expiry: action.payload }
        case SET_CVV_NUMBER:
            return { ...state, cvv: action.payload }
        default:
            return state;
    }
};