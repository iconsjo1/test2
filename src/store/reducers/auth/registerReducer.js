import {registerReducerTypes} from '../../../services';

const INITIAL_STATE = {
  user: null,
  errors: {},
  fcmToken: null,
};

const {
  REGISTER_USER,
  SET_USER_LOADING,
  SET_REGISTER_ERRORS,
  SET_LOGEDIN_USER,
  LOGOUT_USER,
  SET_FCM_TOKEN,
} = registerReducerTypes;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {...state, user: action.payload};
    case SET_USER_LOADING:
      return {...state, loading: action.payload};
    case SET_REGISTER_ERRORS:
      return {...state, errors: action.payload};
    case SET_LOGEDIN_USER:
      return {...state, user: action.payload};
    case LOGOUT_USER:
      return {...state, user: null};
    case SET_FCM_TOKEN:
      return {...state, fcmToken: action.payload};
    default:
      return state;
  }
};
