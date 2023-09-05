import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  I18nManager,
  FlatList,
} from 'react-native';

import styles from './styles';
import ImagePicker from 'react-native-image-picker';
import { getImages } from '../../../store/actions/Gallery/galleryAction';
import { connect } from 'react-redux';
import LoadingWrapper from '../../../components/generic/LoadingWrapper';
import { colors, i18n, images } from '../../../services';
import GalleryHeader from '../../../components/headers/CustomHeader/GalleryHeader';

class Images extends Component {
  constructor(props) {
    super(props);
    this.chooseAvatar = this.chooseAvatar.bind(this);
  }
  async componentDidMount() {
    this.props.getImages();
  }

  chooseAvatar = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxheight: 400,
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User  image picker');
      } else if (response.error) {
        console.log(' Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(' response: ', response);
        this.props.navigation.navigate('ImageView', {
          image: response.uri,
          ImagePicker: 1,
          name: response.fileName,
        });
      }
    });
  };

  render() {
    const { navigation, Images, loading } = this.props;

    return (
      <LoadingWrapper>
        <View style={styles().screenContainer}>
          <GalleryHeader
            navigation={navigation}
            main
            handleMainPress={this.chooseAvatar}
          />
          <View
            style={{
              backgroundColor: colors.white,
            }}>
            {loading ? (
              <View style={{ flex: 1, height: '100%', backgroundColor: '#fff' }}>
                <ActivityIndicator
                  size="large"
                  style={{ alignSelf: 'center', marginTop: 50 }}
                  color={colors.skyBlue}
                />
              </View>
            ) : (
                <View style={styles().container}>
                  <FlatList
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      flex: 1,
                    }}
                    data={Images.data}
                    refreshing={loading}
                    onRefresh={this.props.getImages}
                    keyExtractor={(item) => item.image}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() =>
                          navigation.navigate('ImageView', {
                            image: item.image,
                            ImagePicker: 0,
                            id: item.id,
                            name: item.name,
                          })
                        }>
                        <Image
                          source={{ uri: item.image }}
                          style={styles().image}
                        />
                      </TouchableOpacity>
                    )}
                    ListEmptyComponent={EmptyListComponent}
                  />
                </View>
              )}
          </View>
        </View>
      </LoadingWrapper>
    );
  }
}

const EmptyListComponent = () => (
  <View
    style={{
      flex: 1,
      marginTop: 50,
      alignItems: 'center',
    }}>
    <Image source={images.notFound} style={{ width: 100, height: 100 }} />
    <Text>{I18nManager.isRTL ? 'لا توجد صور' : 'You have no pictures'}</Text>
  </View>
);

const mapStateToProps = (state) => {
  return {
    Images: state.gallery.Images,
    loading: state.gallery.loading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getImages: () => {
    dispatch(getImages());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Images);
