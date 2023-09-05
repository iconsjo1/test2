import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';
import { IosStyleButton, TouchableOpacity, Text } from '../../../../components';
import { colors, fontFamilies, images, i18n, renderCardNumber } from '../../../../services';
import { useSelector, connect } from 'react-redux';
import { getAllCards } from '../../../../store/actions';

const PaymentScreen = ({ selectedMethod, setShowPromoModal, setSelectedMethod, handleCardPressAction, getAllCards }) => {
    const cards = useSelector(state => state.payment.allCards);
    const [loading, setLoading] = useState(true);
    const selectedCard = useSelector(state => state.payment.selectedCard);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);

    useEffect(() => {
        const cbSucsess = () => {
            setLoading(false);
            setSuccess(true);
        }
        const cbFailure = () => {
            setLoading(false);
            setFailure(true);
        }
        getAllCards(cbSucsess, cbFailure);
    }, []);

    return (
        <>
            <View style={styles().paymentHeader}>
                <View style={styles().topRow}>
                    <View style={styles().servicePrice}>
                        <View style={styles().iconContainerRed}>
                            <Entypo name="phone" color="#FFFFFF" size={20} />
                        </View>
                        <Text>
                            {i18n.t('bookAppointmentTranslations.service')}
                        </Text>
                    </View>
                    <Text style={styles().price}>
                        SAR 45/{i18n.t('bookAppointmentTranslations.visit')}
                    </Text>
                </View>
                <Text style={styles().taxLine}>
                    {i18n.t('bookAppointmentTranslations.taxInc')}
                </Text>
                <View style={{ alignItems: 'flex-end' }}>
                    <IosStyleButton onPress={() => setShowPromoModal(true)} >
                        {i18n.t('bookAppointmentTranslations.addPromo')}
                    </IosStyleButton>
                </View>
            </View>
            <View style={{ padding: 20 }}>
                <View style={styles().cards}>
                    {cardOptions.map((el, i) => (
                        <TouchableOpacity
                            onPress={() => setSelectedMethod(i)}
                            key={i}
                            style={styles().cardContainer}>
                            <View style={[styles().cardImageContainer, { backgroundColor: el.color }]}>
                                <Image resizeMode='contain' source={el.icon} style={styles().cardImageStyle} />
                            </View>
                            <Text
                                style={StyleSheet.flatten([
                                    styles().cardText,
                                    {
                                        color: selectedMethod === i ? colors.black : colors.grey,
                                        fontFamily: selectedMethod === i ? fontFamilies('boldTextHeader') : fontFamilies('normalText'),
                                    }
                                ])}>
                                {i18n.locale === 'ar' ? el.ar_name : el.en_name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles().loaderContainer}>
                    {selectedMethod === 0 ?
                        loading ?
                            <ActivityIndicator />
                            :
                            <View style={styles().cardNumber}>
                                <Text>
                                    {cards && selectedCard !== -1 ? renderCardNumber(cards[selectedCard].cardNumber) : null}
                                </Text>
                                <IosStyleButton onPress={() => handleCardPressAction(actions.select_cards)}>
                                    {i18n.t('bookAppointmentTranslations.change')}
                                </IosStyleButton>
                            </View>
                        : null}
                </View>
            </View>
        </>
    )
}

export default connect(null, { getAllCards })(PaymentScreen);


export const actions = {
    select_cards: "select_cards",
    google_pay: "google_pay",
    apple_pay: "apple_pay",
}


const cardOptions = [
    {
        ar_name: "بطاقة ائتمان",
        en_name: "Credit card",
        icon: images.creditCard,
        color: colors.skyBlue,
        action: actions.select_cards
    },
    {
        ar_name: "جوجل الدفع",
        en_name: "Google pay",
        icon: images.google,
        color: colors.whiteAbsolute,
        action: actions.google_pay
    },
    {
        ar_name: "دفع التفاح",
        en_name: "Apple pay",
        icon: images.apple,
        color: colors.whiteAbsolute,
        action: actions.apple_pay
    },
]
