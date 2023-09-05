import React from 'react'
import { TouchableOpacity, Text } from '..';
import { StyleSheet } from 'react-native';
import { fontFamilies, colors } from '../../services';

const IosStyleButton = ({ children, onPress, underline, light }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={StyleSheet.flatten([
                styles().textStyle,
                {
                    color: light ? colors.grey : colors.skyBlue,
                    textDecorationLine: underline ? "underline" : undefined
                }])}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

export default IosStyleButton;

const styles = () => StyleSheet.create({
    textStyle: {
        fontFamily: fontFamilies('normalTextHeader'),
        padding: 10,
    }
});