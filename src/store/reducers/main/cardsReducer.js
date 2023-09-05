import {cardsReducerTypes} from '../../../services/constants/types';

const {ADD_NEW_CARD, GET_ALL_CARDS} = cardsReducerTypes;

const INITIAL_STATE = [
  {
    cardType: 'Master Card',
    cardNo: '1234432112344321',
    cardHolder: 'Hatem Ramadan',
    cvv: '534',
    expirayDate: '05/23',
  },
  {
    cardType: 'Visa',
    cardNo: '1234432112344321',
    cardHolder: 'Hatem Ramadan',
    cvv: '534',
    expirayDate: '05/23',
  },
  {
    cardType: 'Master Card',
    cardNo: '1234432112344321',
    cardHolder: 'Hatem Ramadan',
    cvv: '534',
    expirayDate: '05/23',
  },
];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_CARDS:
      return [...state];
    case ADD_NEW_CARD:
      return [...state, {...action.payload}];
    default:
      return state;
  }
};
