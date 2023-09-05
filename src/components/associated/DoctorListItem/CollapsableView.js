import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

const CollapsableView = ({children, collapse}) => {
  return (
    <TouchableWithoutFeedback onPress={collapse}>
      {collapse ? <View></View> : children}
    </TouchableWithoutFeedback>
  );
};

export default CollapsableView;

const styles = StyleSheet.create({});
