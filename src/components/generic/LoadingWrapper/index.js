import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {CustomHeader} from '../../index';
import {colors} from '../../../services';
import {ColorDotsLoader} from 'react-native-indicator';

const LoadingWrapper = ({
  loading,
  header,
  children,
  navigation,
  headerBar,
  endIcon,
  white,
  headerText,
}) => {
  return (
    <View style={styles(white).container}>
      {header ? (
        <CustomHeader
          loading={loading}
          headerBar={headerBar}
          headerText={headerText}
          endIcon={endIcon}
          navigation={navigation}
        />
      ) : null}
      {loading ? (
        <View style={styles(white).loadingContainer}>
          <ColorDotsLoader size={20} betweenSpace={7} />
        </View>
      ) : (
        children
      )}
    </View>
  );
};
export default LoadingWrapper;

const styles = (white) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: white ? colors.white : colors.whiteBg,
    },
    loadingContainer: {
      flex: 1,
      backgroundColor: white ? colors.white : colors.whiteBg,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
