import React from 'react'
import { StyleSheet, View } from 'react-native';
import Text from '../generic/Text'
import TouchableOpacity from '../generic/TouchableOpacity'
import { colors, shadows, fontFamilies } from '../../services';

const PrimaryButton = ({ children, onPress, buttonStyle, containerStyle, icon }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles().container, buttonStyle]}>
            {icon ? icon : null}
            <Text style={StyleSheet.flatten([styles().textStyle, { paddingLeft: icon ? 10 : 0 }])}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

export default PrimaryButton;

const styles = () => StyleSheet.create({
    shadowContainer: {
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    container: {
        width: '100%',
        padding: 13,
        marginVertical: 5,
        backgroundColor: colors.greenDark,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textStyle: {
        fontSize: 16,
        fontFamily: fontFamilies('semiboldText'),
        color: colors.white,
        textAlign: 'center'
    }
})