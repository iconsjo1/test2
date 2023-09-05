import {cardsReducerTypes} from '../../../services/constants/types';

const {ADD_NEW_CARD, GET_ALL_CARDS} = cardsReducerTypes;

export const getAllCards = () => {
  return {
    type: GET_ALL_CARDS,
  };
};
export const addNewCreditCard = (cardDetails) => (dispatch) => {
  dispatch({
    type: ADD_NEW_CARD,
    payload: cardDetails,
  });
};
