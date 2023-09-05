import React from 'react'
import { LoadingWrapper, TouchableOpacity } from '../../../../components';
import Feather from 'react-native-vector-icons/Feather';
import { I18nManager, View, ScrollView, ImageBackground, Linking } from 'react-native';
import { colors, fontFamilies, WP, i18n, lineHeights } from '../../../../services';
import styles from './styles';
import HTML from 'react-native-render-html';
import { formatNewsHTML } from './htmlFormattingHelpers';

const NewsDetails = ({ navigation, route }) => {
    const {
        news,
        thumbnail
    } = route.params;

    return (
        <LoadingWrapper>
            <ScrollView>
                <ImageBackground
                    resizeMode='cover'
                    style={styles().imageBg}
                    source={{ uri: thumbnail }}>
                    <View style={styles().backButtonContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles().backTouch}>
                            <Feather name={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'} size={15} color={colors.whiteAbsolute} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <HTML
                    html={formatNewsHTML(news.post_content.trim())}
                    containerStyle={{
                        textAlign: 'left',
                        padding: 20,
                        backgroundColor: colors.whiteBg,
                        borderRadius: 5,
                    }}
                    onLinkPress={(e, href) => Linking.openURL(href)}
                    baseFontStyle={{
                        color: colors.black,
                        fontFamily: fontFamilies('normalText'),
                        lineHeight: lineHeights('normal'),
                        textAlign: i18n.locale === 'ar' ? 'left' : 'justify'
                    }}
                    imagesMaxWidth={WP('100') - 40}
                />
                <View style={{ height: 20 }} />
            </ScrollView>
        </LoadingWrapper>
    )
}

export default NewsDetails;

