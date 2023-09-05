import {Keyboard} from 'react-native';
import {
  displayToast,
  i18n,
  registerReducerTypes,
  routesNames,
} from '../../../services';
import {PROUDTION_HEADER} from '../../../services/apis/environment';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const {
  REGISTER_USER,
  SET_USER_LOADING,
  SET_REGISTER_ERRORS,
  SET_LOGEDIN_USER,
  LOGOUT_USER,
  SET_FCM_TOKEN,
} = registerReducerTypes;

export const storeDataInAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('[Storing] in async Storage');
  } catch (e) {
    console.log(e);
  }
};

export const removeValueFromAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('DELETED');
  } catch (e) {
    console.log('Done.', e);
  }
};

export const setUserLoading = (bool) => {
  return (dispatch) => {
    dispatch({
      type: SET_USER_LOADING,
      payload: bool,
    });
  };
};

export const setUserErrors = (errors) => {
  return (dispatch) => {
    dispatch({
      type: SET_REGISTER_ERRORS,
      payload: errors,
    });
  };
};

export const sendFcmTokenToServer = (token, fcmToken, cbSucc, cbFailure) => {
  return () => {
    console.log('sendFcmTokenToServer', token);
    axios({
      method: 'POST',
      url: '/api/v1',
      headers: {
        'jwt-token': token,
        Authorization: PROUDTION_HEADER.headers.Authorization,
      },
      data: {
        token: fcmToken,
      },
    })
      .then((res) => {
        cbSucc();
        console.log('Token Sent', res);
      })
      .catch((e) => {
        cbFailure();
        console.log('Error Token', e.response);
      });
  };
};

// [Register] the base data UDHID, MRN, MOBILE

export const registerUserAction = (userData, navigation) => {
  Keyboard.dismiss();
  return async (dispatch) => {
    dispatch(setUserLoading(true));
    axios
      .post('/api/v1/auth/register', userData, PROUDTION_HEADER)
      .then((res) => {
        dispatch(setUserLoading(false));
      })
      .catch((err) => {
        console.log({...err});
        dispatch(setUserLoading(false));

        if (err?.response?.data?.statusCode == 403) {
          dispatch(setUserLoading(false));
          dispatch({
            type: REGISTER_USER,
            payload: userData,
          });
          const jsonUser = JSON.stringify(userData);
          storeDataInAsyncStorage('resgisteredUncompletedUser', jsonUser).then(
            (res) => {
              navigation.navigate(routesNames.signupVerification, {
                user: userData,
              });
            },
          );
        } else if (err?.response?.data?.statusCode == 409) {
          dispatch(setUserLoading(false));
          displayToast(
            'error',
            i18n.t('signUpTranslations.deplicateUser'),
            4000,
          );
        } else if (err?.response?.data?.statusCode == 404) {
          dispatch(setUserLoading(false));

          displayToast(
            'error',
            i18n.t('signUpTranslations.notFoundUser'),
            5000,
          );
        } else {
          dispatch(setUserLoading(false));

          displayToast('error', i18n.t('signUpTranslations.unknownError'));
        }
      });
  };
};

// [Register] Resend the Passcode

export const resendPasscode = (userData) => {
  return (dispatch) => {
    axios
      .post('/api/v1/auth/register', userData, PROUDTION_HEADER)
      .then((res) => {})
      .catch((err) => {
        console.log({...err});
        if (err?.response?.data?.statusCode == 403) {
          dispatch({
            type: REGISTER_USER,
            payload: userData,
          });
          displayToast('success', i18n.t('signUpTranslations.resendOtp'));
        } else if (err?.request?.status === 0) {
          displayToast('error', i18n.t('signUpTranslations.unknownError'));
        }
      });
  };
};

// [Register] Verify the Passcode

export const verifyPasscode = (passcode, navigation) => {
  return (dispatch) => {
    dispatch(setUserLoading(true));
    axios
      .post('/api/v1/auth/verify-passcode', passcode, PROUDTION_HEADER)
      .then((res) => {
        console.log({...res});
        if (res.data.statusCode === 200) {
          removeValueFromAsyncStorage('resgisteredUncompletedUser');
          storeDataInAsyncStorage('passcode', JSON.stringify(passcode));
          dispatch(setUserLoading(false));
          navigation.navigate(routesNames.signupSetPassword, {
            user: passcode,
            data: res.data.data,
          });
        }
      })
      .catch((err) => {
        dispatch(setUserLoading(false));

        if (err?.request?.status === 0) {
          displayToast('error', i18n.t('signUpTranslations.unknownError'));
        } else {
          displayToast('error', i18n.t('signUpTranslations.invalidPasscode'));
        }
      });
  };
};

// [Register] Final step Create Password

export const setPasswordAndRegisterUser = (userData, navigation, route) => {
  return (dispatch) => {
    dispatch(setUserLoading(true));
    axios
      .patch('/api/v1/auth/set-password', userData, PROUDTION_HEADER)
      .then((res) => {
        dispatch(setUserLoading(false));
        removeValueFromAsyncStorage('resgisteredUncompletedUser');
        if (route.name === 'SetPassword') {
          navigation.replace(routesNames.setPasswordSuccess);
        } else if (route.name === routesNames.signupSetPassword) {
          displayToast(
            'success',
            i18n.t('signUpTranslations.registerDone'),
            4000,
          );
          navigation.replace(routesNames.main);
        }
      })
      .catch((err) => {
        dispatch(setUserLoading(false));
        console.log({...err});
        const errors = err?.response?.data?.message?.toString();
        if (errors?.includes('math')) {
          displayToast(
            'error',
            i18n.t('signUpTranslations.passwordMatchErr'),
            4000,
          );
        }
        if (errors?.includes('password must be longer')) {
          displayToast(
            'error',
            i18n.t('signUpTranslations.passwordLengthErr'),
            5000,
          );
        }
        if (errors?.includes('Passcode not valid')) {
          displayToast('error', i18n.t('signUpTranslations.passcodeErr'), 4000);
        }
        if (err?.request?.status === 0) {
          displayToast('error', i18n.t('signUpTranslations.unknownError'));
        }
      });
  };
};

// Login Action Creator

export const loginUser = (user, navigation, alert) => {
  return (dispatch) => {
    dispatch(setUserLoading(true));
    axios
      .post('/api/v1/auth/login', user, PROUDTION_HEADER)
      .then(async (res) => {
        console.log('Logged in user', res.data);
        if (alert)
          displayToast('success', i18n.t('loginTranslations.successLogin'));
        dispatch(setUserLoading(false));
        const user = {
          udhId: res.data.user.udhId,
          id: res.data.user.id,
          accessToken: res.data.access_token,
          authorized: res.data.authorized,
          email: res.data.user.email,
          isLoggedOut: res.data.user.isLoggedOut,
          isMobileVerified: res.data.user.isMobileVerified,
          isSuspend: res.data.user.isSuspend,
          locale: res.data.user.locale,
          mobile: res.data.user.mobile,
          mrn: res.data.user.mrn,
          userType: res.data.user.userType,
          name: res.data.user.name,
          surname: res.data.user.surname,
          nameAr: res.data.user.nameAr,
          surnameAr: res.data.user.surnameAr,
          surnameAr: res.data.user.surnameAr,
          gender: res.data.user.gender,
          birthdate: res.data.user.birthdate,
        };
        const fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log('FCMTOKEN01', fcmToken);
        dispatch(
          sendFcmTokenToServer(
            user.accessToken,
            fcmToken,
            () => {},
            () => {},
          ),
        );
        const jsonUser = JSON.stringify(user);
        storeDataInAsyncStorage('user', jsonUser).then((res) => {
          if (navigation) navigation.navigate(routesNames.home);
        });
        // .then(async (token) => {
        //   const fcmToken = await AsyncStorage.getItem('fcmToken')
        //   console.log('FCMTOKEN01', fcmToken)
        //   console.log('user', user)
        //   dispatch(
        //     sendFcmTokenToServer(
        //       user.accessToken,
        //       fcmToken,
        //       () => { },
        //       () => { }
        //     ),
        //   );
        //   const jsonUser = JSON.stringify(user);
        //   storeDataInAsyncStorage('user', jsonUser).then((res) => {
        //     if (navigation) navigation.navigate(routesNames.home);
        //   });
        // })
        // .catch((e) => {
        //   console.log('failed getting fcm');
        // });

        dispatch({
          type: SET_LOGEDIN_USER,
          payload: user,
        });
      })
      .catch((err) => {
        console.log({...err});
        dispatch(setUserLoading(false));
        if (err?.response?.data?.statusCode == 400) {
          displayToast('error', i18n.t('loginTranslations.loginError'), 3000);
        }
        if (err?.request?.status === 0) {
          displayToast('error', i18n.t('signUpTranslations.unknownError'));
        }
      });
  };
};

// [FORGOT PASSWORD]
export const forgotPasswordAction = (udhId, navigation) => {
  return (dispatch) => {
    dispatch(setUserLoading(true));
    axios
      .post('/api/v1/auth/forgot-password', udhId, PROUDTION_HEADER)
      .then((res) => {
        displayToast('success', i18n.t('loginTranslations.successForgotPass'));
        dispatch(setUserLoading(false));
        navigation.navigate(routesNames.setPassword, {
          udhId,
        });
      })
      .catch((err) => {
        dispatch(setUserLoading(false));
        if (err?.response?.data?.statusCode == 404) {
          displayToast('error', i18n.t('loginTranslations.usrNotFound'));
        }
        if (err?.request?.status === 0) {
          displayToast('error', i18n.t('signUpTranslations.unknownError'));
        }
      });
  };
};

// [LOGOUT USER]
export const logoutUser = (token, navigation) => {
  return (dispatch) => {
    axios
      .get('/api/v1/auth/logout', {
        headers: {
          'jwt-token': token,
          Authorization: PROUDTION_HEADER.headers.Authorization,
        },
      })
      .then((res) => {
        console.log(res.data);
        displayToast('success', i18n.t('signUpTranslations.logout'));
        removeValueFromAsyncStorage('user');
        dispatch({
          type: LOGOUT_USER,
        });
        navigation.navigate(routesNames.home);
      })
      .catch((err) => {
        console.log({...err});
        displayToast('success', i18n.t('signUpTranslations.logout'));
        removeValueFromAsyncStorage('user');
        dispatch({
          type: LOGOUT_USER,
        });
        navigation.navigate(routesNames.home);
      });
  };
};

// [GET INFO & CHECK TOKEN]
export const checkTokenValidation = (token, cbSucc, cbFailure) => {
  return (dispatch) => {
    axios
      .get('/api/v1/user/my-info', {
        headers: {
          'jwt-token': token,
          Authorization: PROUDTION_HEADER.headers.Authorization,
        },
      })
      .then((res) => {
        dispatch({
          type: SET_LOGEDIN_USER,
          payload: res.data,
        });
        cbSucc(res.data);
        console.log('success', res.data);
      })
      .catch((error) => {
        console.log(error);
        if (error?.request?.status === 403 || error?.request?.status === 401) {
          cbFailure();
          console.log('erro');
        } else {
          return;
        }
      });
  };
};

export const updateUser = (user, token, cbSucc, cbFailure) => {
  return (dispatch) => {
    axios({
      method: 'PUT',
      url: '/api/v1/user',
      headers: {
        'jwt-token': token,
        Authorization: PROUDTION_HEADER.headers.Authorization,
      },
      data: user,
    })
      .then((res) => {
        displayToast('success', i18n.t('loggedinUserProfile.success'), 3000);
        cbSucc();
      })
      .catch((err) => {
        cbFailure();
        console.log('Errrrorrr', {...err});
        const errors = err?.response?.data?.message?.toString();
        console.log(errors);
        if (errors.includes('surname must be longer than or')) {
          displayToast(
            'error',
            i18n.t('loggedinUserProfile.surnameError'),
            4000,
          );
        } else if (errors.includes('surnameAr')) {
          displayToast(
            'error',
            i18n.t('loggedinUserProfile.surnameArError'),
            4000,
          );
        } else if (errors.includes('Number')) {
          displayToast(
            'error',
            i18n.t('loggedinUserProfile.mobileError'),
            4000,
          );
        } else if (errors.includes('email')) {
          displayToast('error', i18n.t('loggedinUserProfile.errorEmail'), 4000);
        }
      });
  };
};

export const setFcmToken = (token) => {
  return (dispatch) => {
    dispatch({
      type: SET_FCM_TOKEN,
      payload: token,
    });
  };
};
