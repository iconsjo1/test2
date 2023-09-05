import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Share,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Container, Icon } from 'native-base';
import styles from './styles';
var RNFS = require('react-native-fs');
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteImage,
  addItem,
  getImages,
} from '../../../store/actions/Gallery/galleryAction';
import EditImage from '../EditImage';
import PhotoEditor from 'react-native-photo-editor';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { LoadingWrapper } from '../../../components';
import GalleryHeader from '../../../components/headers/CustomHeader/GalleryHeader';
import { i18n } from '../../../services';

const ImageView = (props) => {
  const { navigation, route } = props;
  const { image, id, ImagePicker } = route.params;
  console.log('image uri', image);

  // if (ImagePicker == 0) {
  const uri = image;
  const Generatedname = 'image' + new Date().getTime();
  console.log('Generatedname', Generatedname);
  const path = `${RNFS.DocumentDirectoryPath}/${Generatedname}.jpg`;
  RNFS.downloadFile({ fromUrl: uri, toFile: path })
    .promise.then((res) => {
      console.log('response', res);
    })
    .catch((err) => {
      console.log('response downloadFile', err);
    });
  // }

  const loading = useSelector((state) => state.gallery.loading);
  const dispatch = useDispatch();
  const deleteItem = async (Id) => {
    dispatch(deleteImage(Id, navigation));
    dispatch(getImages());
  };

  var Photo;
  if (ImagePicker == 1) {
    Photo = image.replace('file://', '');
  } else {
    Photo = path.replace('file://', '');
  }
  const Edit = () => {
    PhotoEditor.Edit({
      path: Photo,
      onCancel: () => {
        navigation.navigate('Images');
      },
      onDone: (res) => {
        uploadImage(res);
      },
    });
  };

  const uploadImage = async (res) => {
    var { name } = route.params;
    const uri = 'file://' + res;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const task = storage().ref(`/UDHGallery/${filename}`).putFile(uploadUri);
    try {
      await task;
      console.log('task', task);
      console.log('task', task._ref._storage._customUrlOrRegion + '/' + task._ref.path);
      // var ext;
      // if (ImagePicker == 0) {
      //   ext = '/' + Generatedname + '.jpg';
      // } else {
      //   ext = '/' + name;
      // }
      // console.log('ext', ext);

      storage()
        .refFromURL(task._ref._storage._customUrlOrRegion + '/' + task._ref.path)
        .getDownloadURL()
        .then((url) => {
          console.log('url', url);
          var data = { name: name + '.jpg', image: url };
          console.log('data', data);
          dispatch(addItem(data));
          dispatch(getImages());
          navigation.navigate('Images');
        })
        .catch((e) => console.log('Errors while downloading => ', e));
    } catch (e) {
      console.error(e);
    }
    // console.log('ImagePicker', ImagePicker);
    // var ext;
    // if (ImagePicker == 0) {
    //   ext = '/' + Generatedname + '.jpg';
    // } else {
    //   ext = '/' + name;
    // }
    // console.log('ext', ext);

    // storage()
    //   .ref(ext)
    //   .getDownloadURL()
    //   .then((url) => {
    //     console.log('url', url);
    //     var data = { name: name + '.jpg', image: url };
    //     console.log('data', data);
    //     dispatch(addItem(data));
    //     dispatch(getImages());
    //     navigation.navigate('Images');
    //   })
    //   .catch((e) => console.log('Errors while downloading => ', e));
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
    <LoadingWrapper>
      <View style={styles().screenContainer}>
        <GalleryHeader navigation={navigation} />
        {loading ? (
          <View style={{ flex: 1, height: '100%', backgroundColor: '#fff' }}>
            <ActivityIndicator size={60} style={{ alignSelf: 'center' }} />
          </View>
        ) : (
          <View style={styles().container}>
            <Image source={{ uri: image }} style={styles().image} />
          </View>
        )}
        <View style={styles().footer}>
          <TouchableOpacity
            style={styles().headerText}
            onPress={() => Share.share({ message: image })}>
            <Icon name="share" style={styles().iconfooter} />
            <Text style={styles().footerText}>
              {' '}
              {i18n.t('inpatientGallery.share')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteItem(id)}
            style={styles().headerText}>
            <Icon name="trash" style={styles().iconfooter} />
            <Text style={styles().footerText}>
              {i18n.t('inpatientGallery.delete')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Edit()} style={styles().headerText}>
            <Icon name="pencil" style={styles().iconfooter} />
            <Text style={styles().footerText}>
              {i18n.t('inpatientGallery.edit')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LoadingWrapper>
  );
};

export default ImageView;
