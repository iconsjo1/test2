import React from 'react';
import {View, StyleSheet, StatusBar, I18nManager, Platform} from 'react-native';
import {colors, shadows, i18n, fontFamilies, WP} from '../../../services';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import ShadowView from 'react-native-simple-shadow-view/src/ShadowView';
import {Text, TouchableOpacity} from '../../../components';

const CustomHeader = ({
  endIcon,
  headerText,
  navigation,
  headerBar,
  searchButton,
  loading,
}) => {
  const theme = useSelector((state) => state.theme.themeColor);

  return (
    <>
      <View
        style={[styles().container, Platform.OS === 'ios' ? {zIndex: 10} : {}]}>
        <View>
          <TouchableOpacity
            onPress={loading ? null : () => navigation.goBack()}
            style={styles().backTouch}>
            <Feather
              name={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'}
              size={15}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>
        {headerBar ? (
          <View style={styles().headerBar}>
            <ShadowView
              style={StyleSheet.flatten([
                shadows.lightShadowGrey,
                styles().shadowContainer,
              ])}>
              <Text style={styles().headerBarText}>
                {i18n.t('homeTabTranslations.header')}
              </Text>
            </ShadowView>
          </View>
        ) : (
          <View style={styles().headerText}>
            <Text>{headerText}</Text>
          </View>
        )}
        {endIcon}
      </View>
    </>
  );
};

export default CustomHeader;

const styles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 15,
      justifyContent: 'space-between',
      alignItems: 'center',
      overflow: 'visible',
    },
    backTouch: {
      borderColor: colors.grey,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
    },
    headerText: {
      flex: 1,
      paddingLeft: 10,
      alignItems: 'flex-start',
    },
    headerBar: {
      flex: 1,
      paddingHorizontal: 10,
      paddingRight: 0,
    },
    shadowContainer: {
      backgroundColor: colors.whiteBg,
      padding: 10,
      alignItems: 'center',
      borderRadius: 5,
    },
    headerBarText: {
      color: colors.skyBlue,
      fontFamily: fontFamilies('boldText'),
    },
  });
