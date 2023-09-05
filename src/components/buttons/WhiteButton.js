import React from 'react'
import { StyleSheet } from 'react-native';
import { colors, fontFamilies, lineHeights } from '../../services';
import { ShadowWrapper, Text, TouchableOpacity } from '..';


const WhiteButton = ({ children, onPress, testID }) => {
    return (
        <TouchableOpacity testID={testID} onPress={onPress} style={styles().container}>
            <ShadowWrapper style={styles().shadowContainer}>
                <Text style={styles().textStyle}>
                    {children}
                </Text>
            </ShadowWrapper>
        </TouchableOpacity>
    )
}

export default WhiteButton;

const styles = () => StyleSheet.create({
    shadowContainer: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: colors.white,
        padding: 20,
    },
    container: {
        width: '100%',
        borderRadius: 10,
        marginVertical: 10
    },
    textStyle: {
        fontSize: 16,
        color: colors.black,
        width: '100%',
        textAlign: 'center',


    }
})