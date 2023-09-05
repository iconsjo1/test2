import React, { useState } from 'react'
import { LoadingWrapper, Text, TouchableOpacity } from '../../../components';
import { ScrollView, View, Image, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import styles from './styles';
import { aboutUs } from './aboutUs';
import { i18n, shadows } from '../../../services';
import Collapsible from 'react-native-collapsible';
import ShadowView from 'react-native-simple-shadow-view';

const AboutUs = ({ navigation }) => {
    return (
        <LoadingWrapper
            header
            navigation={navigation}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles().container}>
                <SafeAreaView>
                    {(() => {
                        const TORETURN = aboutUs.map((el, i) => (
                            <View style={styles().aboutContainer}>
                                <Image
                                    style={styles().aboutImageContainer}
                                    source={el.image}
                                    resizeMode='cover' />
                                <Text style={styles().title}>
                                    {i18n.locale === 'ar' ? el.A_TITLE : el.E_TITLE}
                                </Text>
                                <Text style={styles().desc}>
                                    {i18n.locale === 'ar' ? el.A_DESC : el.E_DESC}
                                </Text>
                            </View>
                        ));

                        if (i18n.locale === 'ar') return TORETURN;
                        return TORETURN.reverse();
                    })()}
                </SafeAreaView>
            </ScrollView>
            {/* <View style={{ flex: 1 }}>
                <FlatList
                    style={styles().container}
                    renderItem={({ item: el, index: i }) => (
                        <AboutItem last={i === aboutUs.length - 1} title={i18n.locale === 'ar' ? el.A_TITLE : el.E_TITLE}>
                            <View style={styles().aboutContainer}>
                                <Image
                                    style={styles().aboutImageContainer}
                                    source={el.image}
                                    resizeMode='cover' />
                                <Text style={styles().desc}>
                                    {i18n.locale === 'ar' ? el.A_DESC : el.E_DESC}
                                </Text>
                            </View>
                        </AboutItem>
                    )}
                    data={aboutUs} />
            </View> */}
        </LoadingWrapper>
    )
}

export default AboutUs;

const AboutItem = ({ children, title, last }) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <TouchableOpacity activeOpacity={1}>
            <ShadowView style={StyleSheet.flatten([shadows.lightShadowBlack, styles().shadowWrapper, last ? { marginBottom: 50 } : {}])}>
                <View onPress={() => setCollapsed(!collapsed)}>
                    <Text style={styles().shdaowTitle}>
                        {title}
                    </Text>
                    <Collapsible collapsed={collapsed}>
                        {children}
                    </Collapsible>
                </View>
            </ShadowView>
        </TouchableOpacity>
    );
}
