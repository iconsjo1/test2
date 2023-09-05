import {
  displayToast,
  GalleryReducerTypes,
  routesNames,
} from '../../../services';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { PROUDTION_HEADER } from '../../../services/apis/environment';

const { SET_LOADING, SET_ERRORS, SET_ALL_IMAGES } = GalleryReducerTypes;

export const setLoading = (bool) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: bool,
    });
  };
};

export const setErrors = (errors) => {
  return (dispatch) => {
    dispatch({
      type: SET_ERRORS,
      payload: errors,
    });
  };
};

// ADD GALLERY ITEM

export const addItem = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    let user = await AsyncStorage.getItem('user');
    // console.log('user', user);
    let parsedUser = JSON.parse(user); //201522//
    let inpatient = await AsyncStorage.getItem('inpatient');
    let parsedinpatient = JSON.parse(inpatient);
    let MRN = parsedUser ? parsedUser.mrn : parsedinpatient.CUSTOMERID.trim()
    console.log('MRN', MRN);
    let accessToken = parsedUser ? parsedUser.accessToken : parsedinpatient.accessToken
    axios
      .post(
        '/api/v1/gallery',
        {
          image: data.image,
          name: data.name,
          mrn: MRN,
          babyMrn: MRN,
        },
        {
          headers: {
            'jwt-token': accessToken,
            Authorization: PROUDTION_HEADER.headers.Authorization,
          },
        },
      )
      .then((res) => {
        // console.log('res.data', res);
        dispatch(setLoading(false));
        displayToast('success', 'Uploaded Successfully');
      })
      .catch((err) => {
        dispatch(setLoading(false));
        // console.log('addItem err', err.response);
        displayToast('error', err.response.data.message, 5000);
      });
  };
};

// Delete GALLERY ITEM

export const deleteImage = (id, navigation) => {
  return async (dispatch) => {
    let user = await AsyncStorage.getItem('user');
    // console.log('user', user);
    let parsedUser = JSON.parse(user); //201522//
    // console.log('mrn', mrn);
    let inpatient = await AsyncStorage.getItem('inpatient');
    let parsedinpatient = JSON.parse(inpatient);
    let accessToken = parsedUser ? parsedUser.accessToken : parsedinpatient.accessToken
    dispatch(setLoading(true));
    // console.log('id', id);
    axios
      .delete('/api/v1/gallery/' + id, {
        headers: {
          'jwt-token': accessToken,
          Authorization: PROUDTION_HEADER.headers.Authorization,
        },
      })
      .then((res) => {
        // console.log('res.deleteImage', res);
        dispatch(setLoading(false));
        navigation.navigate('Images');
        displayToast('success', 'Deleted Successfully');
      })
      .catch((err) => {
        dispatch(setLoading(false));
        displayToast('error', err.response.data.message, 5000);
      });
  };
};

// GET IMAGES

export const getImages = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    let user = await AsyncStorage.getItem('user');
    let parsedUser = JSON.parse(user);
    console.log('parsedUser', parsedUser);
    console.log(PROUDTION_HEADER.headers.Authorization);
    let inpatient = await AsyncStorage.getItem('inpatient');
    let parsedinpatient = JSON.parse(inpatient);
    let MRN = parsedUser ? parsedUser.mrn : parsedinpatient.CUSTOMERID.trim()
    let accessToken = parsedUser ? parsedUser.accessToken : parsedinpatient.accessToken
    console.log('MRN', MRN);
    try {
      axios
        .get('/api/v1/gallery?mrn=' + MRN, {
          headers: {
            'jwt-token': accessToken,
            Authorization: PROUDTION_HEADER.headers.Authorization,
          },
        })
        .then((res) => {
          console.log('res.getImages', { ...res });
          dispatch({
            type: SET_ALL_IMAGES,
            payload: res.data,
          });
          dispatch(setLoading(false));
        })
        .catch((err) => {
          console.log({ ...err });
          dispatch(setLoading(false));
          displayToast('error', err.response.data.message, 5000);
        });
    } catch (error) {
      dispatch({
        type: SET_ALL_IMAGES,
        payload: [],
      });
      dispatch(setLoading(false));
    }
  };
};
