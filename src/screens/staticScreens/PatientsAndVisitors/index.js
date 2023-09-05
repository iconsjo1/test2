import React from 'react'
import { LoadingWrapper, Text } from '../../../components'
import { ScrollView, SafeAreaView, StyleSheet, View } from 'react-native';
import styles from './styles';
import HTML from 'react-native-render-html';
import { fontFamilies, lineHeights, colors, i18n, shadows } from '../../../services';
import ShadowView from 'react-native-simple-shadow-view';

const PatientsAndVisitors = ({ navigation, route }) => {
    const {
        data
    } = route.params;
    return (
        <LoadingWrapper
            header
            navigation={navigation}>
            <ScrollView>
                <ShadowView style={StyleSheet.flatten([shadows.lightShadowGreyLowSpread, styles().shadowContainer])}>
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
                                    color: colors.red,
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
                <View style={{ height: 80 }} />
            </ScrollView>
        </LoadingWrapper>
    )
}

export default PatientsAndVisitors
