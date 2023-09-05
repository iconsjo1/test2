import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {colors} from '../../../services';

const ToastIcon = ({error}) => {
  return (
    <View style={styles().iconContainer}>
      <Icon
        name={error ? 'close' : 'check'}
        size={20}
        color={error ? colors.red : colors.green}
      />
    </View>
  );
};

export default ToastIcon;

const styles = () =>
  StyleSheet.create({
    iconContainer: {
      backgroundColor: colors.whiteAbsolute,
      padding: 5,
      borderRadius: 5,
      marginRight: 5,
    },
  });
