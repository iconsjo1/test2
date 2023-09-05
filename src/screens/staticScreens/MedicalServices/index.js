import React from 'react'
import { LoadingWrapper, Text } from '../../../components'
import { ScrollView, Image, SafeAreaView, View, StyleSheet } from 'react-native';
import { images, colors, fontFamilies, lineHeights, i18n, shadows } from '../../../services';
import styles from './styles';
import HTML from 'react-native-render-html';
import ShadowView from 'react-native-simple-shadow-view';

const MedicalServices = ({ navigation, route }) => {
    const {
        data
    } = route.params;

    return (
        <LoadingWrapper
            header
            navigation={navigation}>
            <View style={styles().mainContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <ShadowView style={StyleSheet.flatten([shadows.lightShadowGreyLowSpread, styles().shadowContainer])}>
                            <Image style={styles().image} source={images[data.image]} />
                            <Text style={styles().title}>
                                {data.TITLE}
                            </Text>
                            {data.SHOWASHTML ?
                                <HTML
                                    containerStyle={styles().description}
                                    baseFontStyle={styles().description}
                                    tagsStyles={{
                                        customel: {
                                            width: '100%',
                                            paddingVertical: 10,
                                            fontFamily: fontFamilies('normalText'),
                                            lineHeight: lineHeights('normal'),
                                            color: colors.green,
                                            fontSize: 16,
                                            textAlign: i18n.locale === 'ar' ? 'left' : 'justify'
                                        }
                                    }}
                                    renderers={{
                                        customel: { wrapper: 'Text', renderer: (htmlAttribs, children) => children }
                                    }}
                                    html={data.DESCRIPTION} />
                                :
                                <Text style={styles().description}>
                                    {data.DESCRIPTION}
                                </Text>}
                        </ShadowView>
                        <View style={{ height: 30 }} />
                    </View>
                </ScrollView>
            </View>
        </LoadingWrapper>
    )
}

export default MedicalServices
