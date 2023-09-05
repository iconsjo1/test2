import axios from 'axios';
import { I18nManager } from 'react-native';
import { displayToast, i18n, restaurantTypes } from '../../../services';
import { PROUDTION_HEADER } from '../../../services/apis/environment';

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

export const clearCart = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CART_ITEMS_RESTAURANT,
    });
  };
};

export const getAllOrders = (invoiceNo, mobileNo, cbSuccess, cbFailure) => {
  const url = invoiceNo
    ? `/api/v1/services/order?orderId=${invoiceNo}&type=2`
    : `/api/v1/services/order?buyerMobile=${mobileNo}&type=2`;
  return (dispatch) => {
    axios
      .get(url, PROUDTION_HEADER)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_ALL_ORDERS_RESTAURANT,
          payload: res.data.data,
        });
        if (res.data.data.length === 0 && invoiceNo) {
          displayToast(
            'error',
            I18nManager.isRTL ? 'فاتورة غير صالحة' : 'Invalid Invoice',
          );
          return;
        }
        cbSuccess();
      })
      .catch((err) => {
        console.log({ ...err });
        const errors = err?.response?.data?.message?.toString();
        if (errors?.includes('buyerMobile')) {
          displayToast('error', i18n.t('flowerCart.mobileErr'));
        }
        if (err?.request?.status === 0) {
          displayToast('error', i18n.t('signUpTranslations.unknownError'));
        }
        cbFailure();
      });
  };
};

export const getAllProducts = (cbSuccess, cbFailure) => {
  return (dispatch) => {
    axios
      .get('/api/v1/restaurant', PROUDTION_HEADER)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_ALL_PRODUCTS_RESTAURANT,
          payload: res.data.data,
        });
        // console.log('res.data.data',res.data.data);
        cbSuccess(res.data.data);
      })
      .catch((err) => {
        if (err?.request?.status === 0) {
          displayToast('error', i18n.t('signUpTranslations.unknownError'));
        }
        cbFailure();
      });
  };
};

export const updateOrder = (id, order, cbSuccess, cbFailure) => {
  return (dispatch) => {
    axios
      .put(`/api/v1/services/order/${id}`, order, PROUDTION_HEADER)
      .then((res) => {
        console.log(res.data);

        cbSuccess();
      })
      .catch((err) => {
        cbFailure();

        const errors = err?.response?.data?.message?.toString();
        if (errors?.includes('buyerMobile')) {
          Toast.show(i18n.t('flowerCart.mobileErr'));
        }
        if (err?.request?.status === 0) {
          Toast.show(i18n.t('signUpTranslations.unknownError'));
        }
        console.log({ ...err });
      });
  };
};

export const addItemToCart = (item, cbSuccess, cbFailure) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART_RESTAURANT,
      payload: item,
    });
    displayToast(
      'success',
      I18nManager.isRTL ? 'تمت الاضافة الي عربة التسوق' : 'Added to cart',
    );
    cbSuccess();
  };
};

export const counUp = (item, cbSuccess, cbFailure) => {
  return (dispatch) => {
    dispatch({
      type: COUNT_UP_RESTAURANT,
      payload: item,
    });
    cbSuccess();
  };
};
export const countDown = (item, cbSuccess, cbFailure) => {
  return (dispatch) => {
    dispatch({
      type: COUNT_DOWN_RESTAURANT,
      payload: item,
    });
    cbSuccess();
  };
};

export const deleteItem = (item, cbSuccess, cbFailure) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_CART_ITEM_RESTAURANT,
      payload: item,
    });
    displayToast(
      'success',
      I18nManager.isRTL ? 'تم الحذف بنجاح' : 'Deleted successfully',
    );
    cbSuccess();
  };
};

export const makeOrder = (order, cbSuccess, cbFailure) => {
  return (dispatch) => {
    axios
      .post('/api/v1/services/order', order, PROUDTION_HEADER)
      .then((res) => {
        // console.log('makeOrder', res.data);
        dispatch({
          type: MAKE_ORDER_RESTAURANT,
          payload: order,
        });
        cbSuccess(res.data.data);
      })
      .catch((err) => {
        cbFailure();

        const errors = err?.response?.data?.message?.toString();
        if (errors?.includes('buyerMobile')) {
          Toast.show(i18n.t('flowerCart.mobileErr'));
        }
        if (err?.request?.status === 0) {
          Toast.show(i18n.t('signUpTranslations.unknownError'));
        }
        console.log({ ...err });
      });
  };
};

export const payOrder = (id, cbSuccess, cbFailure) => {
  return (dispatch) => {
    axios.post(`/api/v1/services/order/${id}`, {}, PROUDTION_HEADER)
      .then((res) => {
        // console.log('res',res);
        cbSuccess(res.data.data.order);
      })
      .catch((err) => {
        cbFailure();
        console.log({ ...err });
        const errors = err?.response?.data;
        if (errors?.statusCode) {
          displayToast('error', i18n.t('invoicesTranslations.paiedInvoiceErr'));
        }
        if (err?.request?.status === 0) {
          Toast.show(i18n.t('signUpTranslations.unknownError'));
        }
      });
  };
};

export const updateCartItems = (items) => {
  return (dispatch) => {
    dispatch({
      type: UPDATED_CART_ITEMS_RESTAURANT,
      payload: items,
    });
  };
};

export const rateOrder = (orderId, rating, cbSuccess, cbFailure) => {
  return (dispatch) => {
    axios
      .patch(`/api/v1/services/order/rate/${orderId}`, rating, PROUDTION_HEADER)
      .then((res) => {
        console.log('rateOrderRes', res.data);
        console.log(res.data);
        cbSuccess();
      })
      .catch((err) => {
        console.log('errorRes', err);
        console.log('errorRes', err.response);
        console.log({ ...err });
        cbFailure();
        if (err?.request?.status === 0) {
          displayToast('success', i18n.t('signUpTranslations.unknownError'));

          i18n.t('signUpTranslations.unknownError');
        } else {
        }
      });
  };
};
