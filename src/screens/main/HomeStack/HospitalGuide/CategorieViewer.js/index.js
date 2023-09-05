import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  I18nManager,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Ionicons';

import {LoadingWrapper} from '../../../../../components';
import {colors, fontFamilies, HP, images, WP} from '../../../../../services';
import AuthHeader from '../../../../../components/headers/CustomHeader/AuthHeader';
import styles from './styles';
import {smallScreens} from '../../../../../services/utilities/responsive';
// import pages from '../data/safety';
const CategorieViewer = ({route, navigation}) => {
  const {pageName, pages} = route.params;
  const [selected, setSelected] = useState(0);

  const bulletStyle = {
    ul: () => (
      <Text
        style={{
          fontFamily: fontFamilies('boldTextHeader'),
          fontSize: 12,
          marginTop: 3,
          color: colors.black,
          marginRight: 3,
        }}>
        ●
      </Text>
    ),
  };
  return (
    <LoadingWrapper>
      <View style={styles().container}>
        <View style={{padding: 20}}>
          <AuthHeader navigation={navigation} children={pageName} />
        </View>
        <Image source={images.topHeader} style={styles().topFrame} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            alignSelf: 'center',
            top: smallScreens ? -HP('12') : -HP('9'),
          }}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 30,
            width: WP('90'),
          }}>
          <RenderHtml
            classesStyles={classesStyles}
            listsPrefixesRenderers={bulletStyle}
            containerStyle={{
              overflow: 'scroll',
            }}
            html={pages[selected].html}
            renderers={customHtmlTags}
            tagsStyles={tagsStyles()}
          />
        </ScrollView>

        {pages.length > 1 && (
          <View style={styles().controllersView}>
            <TouchableOpacity
              disabled={selected === 0 ? true : false}
              activeOpacity={0.7}
              style={{
                padding: 10,
                alignItems: 'center',
              }}
              onPress={() => {
                setSelected((prevState) => {
                  if (prevState === 0) {
                    return 0;
                  } else {
                    return prevState - 1;
                  }
                });
              }}>
              <Icon
                name={I18nManager.isRTL ? 'arrow-forward' : 'arrow-back'}
                size={24}
                color={selected === 0 ? colors.grey : colors.skyBlue}
              />
              <Text
                style={{
                  fontFamily: fontFamilies('boldText'),
                  marginTop: 5,
                  color: colors.black,
                  fontSize: smallScreens ? 12 : 14,
                }}>
                {I18nManager.isRTL ? 'السابق' : 'Previous'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={selected === pages.length - 1 ? true : false}
              style={{
                alignItems: 'center',
                padding: 10,
              }}
              onPress={() => {
                setSelected((prevState) => {
                  if (prevState === pages.length - 1) {
                    return pages.length - 1;
                  } else {
                    return prevState + 1;
                  }
                });
              }}>
              <Icon
                name={I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'}
                size={24}
                color={
                  selected === pages.length - 1 ? colors.grey : colors.skyBlue
                }
              />
              <Text
                style={{
                  fontFamily: fontFamilies('boldText'),
                  marginTop: 5,
                  color: colors.black,
                  fontSize: smallScreens ? 12 : 14,
                }}>
                {I18nManager.isRTL ? 'التالي' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <Image source={images.topHeader} style={styles().bottomFrame} />
      </View>
    </LoadingWrapper>
  );
};

const classesStyles = {
  'bordered-box': {
    backgroundColor: colors.white,
    padding: 10,
    borderColor: colors.danger,
    borderWidth: 1,
    width: WP('80'),
    top: -20,
    zIndex: -1,
  },
};

const tagsStyles = () => {
  return {
    container: {
      color: colors.black,
      height: HP('85'),
    },
    h3: {
      fontFamily: fontFamilies('boldText'),
      marginVertical: smallScreens ? 5 : 10,
    },
    h4: {
      fontFamily: fontFamilies('boldText'),
      marginVertical: smallScreens ? 5 : 10,
      marginHorizontal: 10,
    },
    h5: {
      fontFamily: fontFamilies('boldText'),
      marginVertical: smallScreens ? 5 : 10,
    },
    p: {
      textAlign: I18nManager.isRTL ? 'left' : 'auto',
      fontFamily: fontFamilies('normalText'),
      lineHeight: 22,
      color: colors.darkGrey,
      fontSize: smallScreens ? 11 : 12,
      marginHorizontal: 10,
    },
    ul: {
      alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-start',
      flex: 1,
      marginBottom: 0,
      width: WP('80'),
    },
    li: {
      marginBottom: -10,
      flexDirection: 'row',
      alignItems: 'flex-start',
      textAlign: I18nManager.isRTL ? 'left' : 'auto',
      fontFamily: fontFamilies('normalText'),
      lineHeight: smallScreens ? 19 : 22,
      fontSize: smallScreens ? 10.5 : 12,
    },
  };
};

const customHtmlTags = {
  container: {
    wrapper: 'View',
    renderer: (htmlAttribs, children) => (
      <View
        style={{
          alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-start',
          flex: 1,
          width: WP('86'),
        }}>
        {children}
      </View>
    ),
  },

  center: {
    wrapper: 'View',
    renderer: (htmlAttribs, children) => (
      <View
        style={{
          alignSelf: 'center',
        }}>
        {children}
      </View>
    ),
  },
};

export default CategorieViewer;
