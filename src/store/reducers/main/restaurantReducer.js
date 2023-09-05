import {restaurantTypes} from '../../../services';

const {
  GET_ALL_PRODUCTS_RESTAURANT,
  GET_ALL_ORDERS_RESTAURANT,
  UPDATE_ORDER_RESTAURANT,
  CLEAR_CART_ITEMS_RESTAURANT,
  ADD_TO_CART_RESTAURANT,
  COUNT_DOWN_RESTAURANT,
  COUNT_UP_RESTAURANT,
  DELETE_CART_ITEM_RESTAURANT,
  MAKE_ORDER_RESTAURANT,
  UPDATED_CART_ITEMS_RESTAURANT,
  RATE_ORDER_RESTAURANT,
} = restaurantTypes;

const INTIAL_STATE = {
  tags: [
    {
      name: 'Offers',
      nameAr: 'العروض',
    },
    {
      name: 'Sandwich',
      nameAr: 'ساندوتش',
    },
    {
      name: 'Salads',
      nameAr: 'سلطة',
    },
    {
      name: 'Desserts',
      nameAr: 'حلويات',
    },
    {
      name: 'Juices',
      nameAr: 'عصائر',
    },
  ],
  products: [],
  cart: [],
  orders: [],
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_RESTAURANT:
      return {...state, products: action.payload};
    case GET_ALL_ORDERS_RESTAURANT:
      return {...state, orders: action.payload};
    case CLEAR_CART_ITEMS_RESTAURANT:
      return {...state, cart: []};
    case ADD_TO_CART_RESTAURANT:
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
    case COUNT_UP_RESTAURANT:
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
    case COUNT_DOWN_RESTAURANT:
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
    case DELETE_CART_ITEM_RESTAURANT:
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem) => cartItem.id !== action.payload.id,
        ),
      };
    case MAKE_ORDER_RESTAURANT:
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
    case RATE_ORDER_RESTAURANT:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? {...action.payload} : order,
        ),
      };
    case UPDATED_CART_ITEMS_RESTAURANT:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};
