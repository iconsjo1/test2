import React from 'react'
import { TouchableOpacity as _TouchableOpacity, StyleSheet } from 'react-native';
import { fontFamilies, lineHeights } from '../../../services';
import { TouchableOpacity as _TouchableOpacityGH } from 'react-native-gesture-handler';
const TouchableOpacity = ({ style, children, activeOpacity = 0.6, onPress, testID, useRNGH, disabled }) => {
    if (useRNGH) return (
        <_TouchableOpacityGH disabled={disabled} testID={testID} activeOpacity={activeOpacity} onPress={onPress} style={style}>
            {children}
        </_TouchableOpacityGH>
    )
    else return (
        <_TouchableOpacity disabled={disabled} testID={testID} activeOpacity={activeOpacity} onPress={onPress} style={style}>
            {children}
        </_TouchableOpacity>
    )
}

export default TouchableOpacity;
