import React from 'react';
import { View, StyleSheet, Linking, Image } from 'react-native';
import TouchableOpacity from '../TouchableOpacity';
import { images, WP, colors, fontFamilies, i18n, hospitalEmail, hospitalPhone } from '../../../services';
import Icon from 'react-native-vector-icons/Ionicons';
import Text from '../Text';

const SocailMediaLinks = () => {
    const socialMediaLinks = [
        {
            icon: images.ig,
            link: "https://www.instagram.com/udhmed/"
        },
        {
            icon: images.tw,
            link: "https://twitter.com/udhmed"
        },
        {
            icon: images.yt,
            link: "https://www.youtube.com/user/UDHMED"
        },
        {
            icon: images.fb,
            link: "https://www.facebook.com/UDHMED/"
        },
        {
            icon: "mail-outline",
            link: hospitalEmail
        },
        {
            icon: "call-outline",
            link: hospitalPhone
        },
    ]
    return (
        <View style={styles().container}>
            <Text style={styles().tagLine}>
                {i18n.t('homeTabTranslations.unitedTocare')}
            </Text>
            <View style={styles().socailMediaContainer}>
                {socialMediaLinks.map((el, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => Linking.openURL(el.link)}
                        style={styles().socialIconContainer}>
                        {typeof (el.icon) === "string" ?
                            <Icon
                                size={WP("8")}
                                color={colors.black}
                                name={el.icon} />
                            :
                            <Image
                                style={styles().imageIcon}
                                resizeMode='contain'
                                source={el.icon} />}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default SocailMediaLinks

const styles = () => StyleSheet.create({
    container: {
        borderTopColor: colors.lightGrey,
        borderTopWidth: 1
    },
    socailMediaContainer: {
        flexDirection: 'row',
        width: WP('100'),
        justifyContent: 'space-between',
    },
    socialIconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    imageIcon: {
        width: WP('10'),
        height: WP('10'),
        maxWidth: 90,
        maxHeight: 90
    },
    tagLine: {
        width: WP('100'),
        alignSelf: 'center',
        textAlign: 'center',
        color: colors.golden,
        paddingTop: 5,
        fontSize: 17,
        fontFamily: fontFamilies('semiboldText')
    }
})