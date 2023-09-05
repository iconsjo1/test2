import axios from 'axios';
import { I18nManager } from 'react-native';
import Toast from 'react-native-simple-toast';

import { displayToast, flowerServiceTypes, HP, i18n } from '../../../services';
import { PROUDTION_HEADER } from '../../../services/apis/environment';
const {
  GET_ALL_PRODUCTS,
  GET_ALL_ORDERS,
  CLEAR_CART_ITEMS,
  UPDATE_ORDER,
  ADD_TO_CART,
  COUNT_DOWN,
  COUNT_UP,
  DELETE_CART_ITEM,
  MAKE_ORDER,
  UPDATED_CART_ITEMS,
  RATE_ORDER,
} = flowerServiceTypes;

export const clearCart = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CART_ITEMS,
    });
  };
};

export const addItemToCart = (item, cbSuccess, cbFailure) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: item,
    });
    displayToast(
      'success',
      I18nManager.isRTL ? 'تمت الاضافة الي عربة التسوق' : 'Added to cart',
      2000,
    );
    cbSuccess();
  };
};

export const getAllOrders = (invoiceNo, mobileNo, cbSuccess, cbFailure) => {
  const url = invoiceNo
    ? `/api/v1/services/order?orderId=${invoiceNo}&type=1`
    : `/api/v1/services/order?buyerMobile=${mobileNo}&type=1`;
  return (dispatch) => {
    axios
      .get(url, PROUDTION_HEADER)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_ALL_ORDERS,
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
      .get('/api/v1/gift-store', PROUDTION_HEADER)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_ALL_PRODUCTS,
          payload: res.data.data,
        });
        cbSuccess(res.data.data);
      })
      .catch((err) => {
        console.log({ ...err });
        if (err?.request?.status === 0) {
          displayToast('error', i18n.t('signUpTranslations.unknownError'));
        }
        cbFailure();
      });
  };
};

export const counUp = (item, cbSuccess, cbFailure) => {
  return (dispatch) => {
    dispatch({
      type: COUNT_UP,
      payload: item,
    });
    cbSuccess();
  };
};
export const countDown = (item, cbSuccess, cbFailure) => {
  return (dispatch) => {
    dispatch({
      type: COUNT_DOWN,
      payload: item,
    });
    cbSuccess();
  };
};

export const deleteItem = (item, cbSuccess, cbFailure) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_CART_ITEM,
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
        console.log(res.data);
        dispatch({
          type: MAKE_ORDER,
          payload: order,
        });
        cbSuccess(res.data.data);
      })
      .catch((err) => {
        cbFailure(err);

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

export const payOrder = (id, cbSuccess, cbFailure) => {
  return (dispatch) => {
    console.log('payOrderFlower');
    axios.post(`/api/v1/services/order/${id}`, {}, PROUDTION_HEADER)
      .then((res) => {
        console.log('res', res);
        cbSuccess(res.data.data.order);
      })
      .catch((err) => {
        console.log('payOrderFlo', err.response);
        cbFailure(err);
        console.log({ ...err });
        const errors = err?.response?.data;
        if (errors?.statusCode) {
          Toast.show(i18n.t('signUpTranslations.unknownError'));
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
      type: UPDATED_CART_ITEMS,
      payload: items,
    });
  };
};

export const rateOrder = (orderId, rating, cbSuccess, cbFailure) => {
  return (dispatch) => {
    axios
      .patch(`/api/v1/services/order/rate/${orderId}`, rating, PROUDTION_HEADER)
      .then((res) => {
        console.log('rateOrder',res.data);
        cbSuccess();
      })
      .catch((err) => {
        console.log('rateOrderError',err);
        console.log('rateOrderError',err.reponse);
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
