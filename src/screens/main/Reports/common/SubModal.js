import React from 'react'
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { colors, WP, fontFamilies, shadows } from '../../../../services';
import { Text, PrimaryButton, TouchableOpacity } from '../../../../components';
import ShadowView from 'react-native-simple-shadow-view';

const SubModal = ({ headerText, buttonText, data, onPressCancel, onSelect }) => {
    return (
        <View style={[StyleSheet.absoluteFill, styles().container]}>
            <ShadowView style={[shadows.darkShadowBlack, styles().innerContainer]}>
                <View style={styles().headerContainer}>
                    <Text style={styles().header}>
                        {headerText}
                    </Text>
                </View>
                <ScrollView>
                    {data.map((el, i) => (
                        <TouchableOpacity
                            onPress={() => onSelect(el)}
                            key={i}
                            style={[
                                {
                                    marginTop: i === 0 ? 20 : undefined,
                                    marginBottom: i === data.length - 1 ? 20 : undefined
                                },
                                styles().itemContainer
                            ]}>
                            <Text>
                                {el}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <PrimaryButton onPress={onPressCancel} buttonStyle={styles().buttonStyle}>
                    {buttonText}
                </PrimaryButton>
            </ShadowView>
        </View>
    )
}

export default SubModal;

const styles = () => StyleSheet.create({
    container: {
        backgroundColor: colors.black + "77",
        zIndex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        width: WP('90'),
        backgroundColor: colors.white,
        maxHeight: Platform.OS === 'android' ? '90%' : '80%',
        borderRadius: 15,
    },
    headerContainer: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        overflow: 'hidden',
    },
    header: {
        padding: 15,
        fontSize: 18,
        width: '100%',
        backgroundColor: colors.primary,
        color: colors.whiteAbsolute,
        textAlign: 'center',
        fontFamily: fontFamilies('normalTextHeader')
    },
    scroller: {
        paddingHorizontal: 20
    },
    itemContainer: {
        width: '90%',
        alignSelf: 'center',
        padding: 15,
        marginVertical: 5,
        backgroundColor: colors.extraLightGrey,
        borderRadius: 10,
    },
    buttonStyle: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 15,
    }
})