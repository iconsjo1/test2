/*
THIS COMPONENT IS BEING USED AT THE APPONTMENTS TAB
WHERE THE USER HAS TO SELECT A SPECIALITY TO PREOCEED
*/

import React from 'react'
import { View, StyleSheet, I18nManager, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, i18n, fontFamilies, lineHeights, WP } from '../../../services';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { Text, TouchableOpacity } from '../../../components';

const SpecialitySelector = ({ E_NAME, A_NAME, onPress, testID, CODE }) => {
    return (
        <TouchableOpacity useRNGH={Platform.OS === 'android'} testID={testID} onPress={onPress} style={styles().container}>
            <LinearGradient colors={[colors.skyBlue, colors.skyBlueDark]} style={styles().gradientStyle}>
                <Icons name="heartbeat" color="#FFF" size={20} />
            </LinearGradient>
            <Text testID={E_NAME} style={styles().name}>
                {i18n.locale === 'ar' ? A_NAME : E_NAME}
            </Text>
            <Icons name={I18nManager.isRTL ? "chevron-left" : "chevron-right"} color={colors.grey} size={20} />
        </TouchableOpacity>
    )
}

export default SpecialitySelector;

const styles = () => StyleSheet.create({
    container: {
        width: WP('92'),
        marginVertical: 10,
        paddingHorizontal: 5,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: "center"
    },
    gradientStyle: {
        padding: 10,
        borderRadius: 10
    },
    name: {
        marginHorizontal: 10,
        fontSize: 15,
        flex: 1,
        textAlign: 'left',
        color: colors.darkGrey,


    }
});