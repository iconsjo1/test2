import React, { useRef, useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, Image, I18nManager } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import styles from './styles';
import { WhiteButton, Text } from '../../../components';
import { images, WP, colors, routesNames, i18n, firstTimeStart } from '../../../services';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';
import ids from '../../../../ids';
import AsyncStorage from '@react-native-community/async-storage';

const Landing = ({ navigation }) => {
    const viewPager = useRef(undefined);
    const [page, setPage] = useState(0);
    const buttonHandler = () => {
        // i18n.setLanguage('ar');

        if (I18nManager.isRTL) {
            if (page > 0) {
                setPage(page - 1);
                viewPager.current.setPage(page - 1);
            }
            else {
                navigation.replace(routesNames.main);
                AsyncStorage.setItem(firstTimeStart, '[COMPLETED]')
            }
        }
        else {
            if (page < viewPager.current.props.children.length - 1) {
                setPage(page + 1);
                viewPager.current.setPage(page + 1);
            }
            else {
                navigation.replace(routesNames.main);
                AsyncStorage.setItem(firstTimeStart, '[COMPLETED]')
            }
        }
    }

    const promoImages = [
        <PromoPicture
            index={0}
            key={0}
            imageSrc={i18n.locale === 'ar' ? images.promoPic1Ar : images.promoPic1En}
            label={i18n.t('landingTranslations.imageLine3')} />,
        <PromoPicture
            index={1}
            key={1}
            imageSrc={i18n.locale === 'ar' ? images.promoPic2Ar : images.promoPic2En}
            label={i18n.t('landingTranslations.imageLine1')} />,
        <PromoPicture
            index={2}
            key={2}
            imageSrc={i18n.locale === 'ar' ? images.promoPic3Ar : images.promoPic3En}
            label={i18n.t('landingTranslations.imageLine2')} />,
        <PromoPicture
            index={3}
            key={3}
            imageSrc={i18n.locale === 'ar' ? images.promoPic4Ar : images.promoPic4En}
            label={i18n.t('landingTranslations.imageLine4')} />,
    ]

    return (
        <View style={styles().container}>
            <ViewPager
                overScrollMode='never'
                initialPage={I18nManager.isRTL ? 3 : 0}
                onPageSelected={e => setPage(e.nativeEvent.position)}
                ref={ref => viewPager.current = ref}
                style={styles().pager}>
                {I18nManager.isRTL ?
                    promoImages.reverse().map(el => el)
                    :
                    promoImages.map(el => el)}
            </ViewPager>
            <View style={styles().bottomContainer}>
                <PageIndicators length={4} selected={page} />
                <WhiteButton
                    testID={ids.landingIds.continue}
                    onPress={buttonHandler}>
                    {I18nManager.isRTL ?
                        page !== 0 ? i18n.t('landingTranslations.continue') : i18n.t('landingTranslations.start')
                        :
                        page !== 3 ? i18n.t('landingTranslations.continue') : i18n.t('landingTranslations.start')}
                </WhiteButton>
            </View>
        </View>
    );
};

export default Landing;

const PromoPicture = ({ index, imageSrc, label }) => {
    return (
        <View style={[
            styles().picContainer,
            {
                borderBottomRightRadius: index === 3 ? WP('10') : 0,
                borderBottomLeftRadius: index === 0 ? WP('10') : 0,
            }]}>
            <Image
                source={imageSrc}
                resizeMode="cover"
                style={styles().imageStyle} />
            {/* <LinearGradient
                colors={[white + "00", white]}
                locations={[0, 0.3]}
                style={styles().gradientContainer}>
                <Text style={styles().labelText}>
                    {label}
                </Text>
            </LinearGradient> */}
        </View>
    );
}

const PageIndicators = ({ length, selected = 0 }) => (
    <View style={styles().indicatorsContainer}>
        {(() => {
            const toreturn = [];
            for (let i = 0; i < length; i++) {
                if (i === selected) toreturn.push(<FontAwesome name='dot-circle-o' color={colors.white} size={20} />)
                else toreturn.push(<Octicons name='primitive-dot' color={colors.white} size={20} />)
            }
            if (I18nManager.isRTL)
                return toreturn.reverse().map((el, i) => <View style={{ paddingHorizontal: 5 }} key={i}>{el}</View>);
            else
                return toreturn.map((el, i) => <View style={{ paddingHorizontal: 5 }} key={i}>{el}</View>);
        })()}
    </View>
)