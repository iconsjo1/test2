import React, {useState} from 'react';
import {CheckBox, Container} from 'native-base';
import {Platform, View, ActivityIndicator} from 'react-native';
import PhotoEditor from 'react-native-photo-editor';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {addItem, getImages} from '../../../store/actions/Gallery/galleryAction';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../EditImage/styles';

const EditImage = (props) => {
  const {navigation, route} = props;
  const {image, name, ImagePicker} = route.params;

  console.log('route.params', name);
  const loading = useSelector((state) => state.gallery.loading);
  const dispatch = useDispatch();

  const uploadImage = async (res) => {
    const uri = 'file://' + res;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    const task = storage().ref(`/UDHGallery/${filename}`).putFile(uploadUri);
    try {
      await task;
      console.log('task', task);
    } catch (e) {
      console.error(e);
    }
    console.log('ImagePicker', ImagePicker);
    var ext;
    if (ImagePicker == 0) {
      ext = '/' + name + '.jpg';
    } else {
      ext = '/' + name;
    }
    console.log('ext', ext);

    storage()
      .ref(ext)
      .getDownloadURL()
      .then((url) => {
        console.log('url', url);
        var data = {name: name + '.jpg', image: url};
        dispatch(addItem(data));
        dispatch(getImages());
        navigation.navigate('Images');
      })
      .catch((e) => console.log('Errors while downloading => ', e));
  };

  auth()
    .signInAnonymously()
    .then(() => {
      console.log('User signed in anonymously');
    })
    .catch((error) => {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }
      console.error(error);
    });

  return (
    <Container style={{flex: 1}}>
      {loading ? (
        <View style={styles.loadingView}>
          <ActivityIndicator size={60} style={{alignSelf: 'center'}} />
        </View>
      ) : (
        PhotoEditor.Edit({
          path: image.replace('file://', ''),
          onCancel: () => {
            console.log('called');
            navigation.goBack();
          },
          onDone: (res) => {
            uploadImage(res);
          },
        })
      )}
    </Container>
  );
};

export default EditImage;
