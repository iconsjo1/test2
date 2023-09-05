import { paymentsReducersTypes } from "../../../services";

const {
    SET_ALL_CARDS,
    SET_SELECTED_CARD
} = paymentsReducersTypes;

export const getAllCards = (cbSuccess, cbFailure) => async dispatch => {
    try {
        setTimeout(() => {
            dispatch({
                type: SET_ALL_CARDS,
                payload: dummyCards
            });
            dispatch({
                type: SET_SELECTED_CARD,
                payload: 0
            })
            cbSuccess();
        }, 1000);
    } catch (e) {
        console.log('[ERROR GETTING ALL CARDS]', e, e.response);
        cbFailure();
    }
}

const dummyCards = [
    {
        type: "MASTER-CARD",
        cardNumber: "3874824324232234",
    },
    {
        type: "VISA-MASTER",
        cardNumber: "3874824324232234",
    },
    {
        type: "MASTER-CARD",
        cardNumber: "3874824324232234",
    },
    {
        type: "AMERICAN-EXPRESS",
        cardNumber: "3874824324232234",
    },
]