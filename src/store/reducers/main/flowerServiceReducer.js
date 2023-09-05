import {flowerServiceTypes} from '../../../services';

const {
  GET_ALL_PRODUCTS,
  GET_ALL_ORDERS,
  CLEAR_CART_ITEMS,
  ADD_TO_CART,
  COUNT_DOWN,
  COUNT_UP,
  DELETE_CART_ITEM,
  MAKE_ORDER,
  UPDATED_CART_ITEMS,
  RATE_ORDER,
} = flowerServiceTypes;

const INTIAL_STATE = {
  products: [],
  cart: [],
  orders: [],
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, products: action.payload};
    case GET_ALL_ORDERS:
      return {...state, orders: action.payload};
    case CLEAR_CART_ITEMS:
      return {...state, cart: []};
    case ADD_TO_CART:
      const selectedItem = state.cart.filter(
        (item) => item.id == action.payload.id,
      );
      if (selectedItem.length > 0) {
        console.log('from found item');
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === selectedItem[0].id
              ? {
                  ...selectedItem[0],
                  count: action.payload.withCount
                    ? selectedItem[0].count + action.payload.count
                    : selectedItem[0].count + 1,
                }
              : item,
          ),
        };
      } else {
        console.log('from first');
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }
    case COUNT_UP:
      const focusedItem = state.cart.filter(
        (item) => item.id == action.payload.id,
      );
      console.log('Foucsed Item', focusedItem);
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === focusedItem[0].id
            ? {
                ...focusedItem[0],
                count: focusedItem[0].count + 1,
              }
            : item,
        ),
      };
    case COUNT_DOWN:
      const focusedItem1 = state.cart.filter(
        (item) => item.id == action.payload.id,
      );
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === focusedItem1[0].id
            ? {
                ...focusedItem1[0],
                count: focusedItem1[0].count - 1,
              }
            : item,
        ),
      };
    case DELETE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem) => cartItem.id !== action.payload.id,
        ),
      };
    case MAKE_ORDER:
      const orderToBeUpdated = state.orders.find(
        (el) => el.id === action.payload.id,
      );
      return {
        ...state,
        orders: orderToBeUpdated
          ? state.orders.map((order) =>
              order.id === orderToBeUpdated.id ? {...action.payload} : order,
            )
          : [...state.orders, action.payload],
      };
    case RATE_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? {...action.payload} : order,
        ),
      };
    case UPDATED_CART_ITEMS:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};
