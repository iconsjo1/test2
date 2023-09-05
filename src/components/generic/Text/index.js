import React from 'react'
import { Text as TEXT, StyleSheet } from 'react-native';
import { fontFamilies, lineHeights, colors } from '../../../services';

const Text = ({ style = {}, children, grey, testID, numberOfLines }) => {
    return (
        <TEXT numberOfLines={numberOfLines} testID={testID} style={StyleSheet.flatten([
            {
                fontFamily: fontFamilies('normalText'),
                lineHeight: lineHeights('normal'),
                color: grey ? colors.grey : colors.black,
            },
            style
        ])}>
            {children}
        </TEXT>
    )
}

export default Text;
