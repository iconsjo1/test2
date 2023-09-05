import React, { useRef, useState } from 'react'
import { View, StyleSheet, Linking, Platform } from 'react-native';
import { WP, colors, fontFamilies, routesNames, i18n, removeSeconds, getDateMonthYear, hospitalLocation } from '../../../../services';
import { Text, PrimaryButton, HollowButton } from '../../../../components';
import Modal from 'react-native-modal';
import ids from '../../../../../ids';
import { getFullDayName, formatMilitaryTime } from '../../../../services/utilities/helpers';
import Mailer from 'react-native-mail';
import { presentEventCreatingDialog } from 'react-native-add-calendar-event';
import moment from 'moment';
import { CommonActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const ModalContent = ({ success, failure, hide, navigation, date, time, name, showPayment, resType, specilaity }) => {
    const onHide = useRef();
    const [step, setStep] = useState(1);

    const stringToShare = `${i18n.t('homeTabTranslations.header')}
${i18n.t('bookAppointmentTranslations.details')}
----------------------------------------

${i18n.t('bookAppointmentTranslations.docName')}
${name}
${specilaity ? ("\n" + i18n.t('bookAppointmentTranslations.speciality') + "\n" + specilaity) + "\n" : ""}
${i18n.t('bookAppointmentTranslations.date')}
${getDateMonthYear(date)} (${getFullDayName(date)})

${i18n.t('bookAppointmentTranslations.time')}
${time}

${i18n.t('bookAppointmentTranslations.please')}`;

    return (
        <Modal
            onModalHide={() => {
                if (onHide.current) {
                    onHide.current();
                    onHide.current = null;
                }
            }}
            useNativeDriver
            backdropColor={colors.modalBackDrop}
            isVisible={success || failure}>
            <View style={styles().container}>
                {success ?
                    <>
                        <Text style={styles().normal}>
                            {i18n.t('bookAppointmentTranslations.appConfirmed')}
                        </Text>
                        <Text style={styles().date}>
                            {getDateMonthYear(date)} ({getFullDayName(date)})
                        </Text>
                        <Text style={styles().date}>
                            {time}
                        </Text>
                        <Text style={styles().docName}>
                            {name}
                        </Text>
                        {step === 1 ?
                            <>
                                <Text style={styles().normal}>
                                    {i18n.t('bookAppointmentTranslations.please')}
                                </Text>
                                <View style={styles().buttonCOntainer}>
                                    {resType === 0 ?
                                        <PrimaryButton
                                            icon={<Ionicons name="location" color={colors.whiteAbsolute} size={23} />}
                                            buttonStyle={{ padding: 11 }}
                                            onPress={() => Linking.openURL(hospitalLocation)}>
                                            {i18n.t('bookAppointmentTranslations.sendLocation')}
                                        </PrimaryButton>
                                        : null}
                                    <PrimaryButton
                                        icon={<Ionicons name="logo-whatsapp" color={colors.whiteAbsolute} size={23} />}
                                        buttonStyle={{ padding: 11 }}
                                        onPress={() => Linking.openURL('whatsapp://send?text=' + stringToShare)}>
                                        {i18n.t('bookAppointmentTranslations.shW')}
                                    </PrimaryButton>
                                    {<PrimaryButton
                                        icon={<Ionicons name="mail-outline" color={colors.whiteAbsolute} size={23} />}
                                        buttonStyle={{ padding: 11 }}
                                        onPress={Platform.OS === 'android' ? () => Mailer.mail({
                                            subject: i18n.t('bookAppointmentTranslations.title'),
                                            body: stringToShare,
                                        }, (e) => console.log(e))
                                            :
                                            () => Linking.openURL(
                                                `mailto:?subject=${i18n.t('bookAppointmentTranslations.title')}&body=${stringToShare}`
                                            )}
                                    >
                                        {i18n.t('bookAppointmentTranslations.shE')}
                                    </PrimaryButton>}
                                    <PrimaryButton
                                        icon={<Ionicons name="ios-calendar-sharp" color={colors.whiteAbsolute} size={23} />}
                                        buttonStyle={{ padding: 11 }}
                                        onPress={() => {
                                            presentEventCreatingDialog({
                                                title: i18n.t('bookAppointmentTranslations.title'),
                                                startDate: makeCalenderString(date, time),
                                                notes: i18n.t('bookAppointmentTranslations.please')
                                            });
                                        }}>
                                        {i18n.t('bookAppointmentTranslations.shC')}
                                    </PrimaryButton>
                                </View>
                                <View style={styles().buttonCOntainer}>
                                    <HollowButton
                                        testID={ids.bookAppointment.returnHome}
                                        // onPress={() => setStep(2)}>
                                        onPress={() => {
                                            onHide.current = () => navigation.replace(routesNames.main, { screen: routesNames.home });
                                            hide();
                                        }}>
                                        {i18n.t('bookAppointmentTranslations.returnMain')}
                                    </HollowButton>
                                    <HollowButton
                                        testID={ids.bookAppointment.returnHome}
                                        fontSize={14}
                                        onPress={() => {
                                            onHide.current = () => navigation.dispatch(CommonActions.reset({
                                                index: 1,
                                                routes: [
                                                    { name: routesNames.main, },
                                                    { name: routesNames.myAppointments }
                                                ]
                                            }));
                                            hide();
                                        }}>
                                        {i18n.t('bookAppointmentTranslations.appMgmt')}
                                    </HollowButton>
                                </View>
                            </>
                            : null}
                        {step === 2 ?
                            <>
                                <Text style={styles().normal}>
                                    {i18n.t('bookAppointmentTranslations.pay')}
                                </Text>
                                <View style={styles().buttonsRow}>
                                    <View style={styles().buttonCOntainerRow}>
                                        <HollowButton
                                            testID={ids.bookAppointment.later}
                                            onPress={() => {
                                                onHide.current = () => navigation.replace(routesNames.main, { screen: routesNames.home });
                                                hide();
                                            }}>
                                            {i18n.t('bookAppointmentTranslations.later')}
                                        </HollowButton>
                                    </View>
                                    <View style={styles().buttonCOntainerRow}>
                                        <PrimaryButton
                                            testID={ids.bookAppointment.continue}
                                            onPress={() => {
                                                showPayment();
                                                hide();
                                            }}>
                                            {i18n.t('bookAppointmentTranslations.continue')}
                                        </PrimaryButton>
                                    </View>
                                </View>
                            </>
                            : null}

                    </>
                    :
                    <>
                        <Text style={{ paddingVertical: 30, color: colors.danger }}>
                            {i18n.t('bookAppointmentTranslations.error')}
                        </Text>
                        <PrimaryButton
                            onPress={() => hide()}
                            buttonStyle={{ width: '60%' }}>
                            {i18n.t('bookAppointmentTranslations.close')}
                        </PrimaryButton>
                    </>
                }
            </View>
        </Modal >
    )
}

export default ModalContent;

const styles = () => StyleSheet.create({
    container: {
        padding: WP('5'),
        width: WP('85'),
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: colors.whiteBg
    },
    normal: {
        marginVertical: 10,
        color: colors.darkGrey,
        textAlign: 'center'
    },
    date: {
        marginVertical: 5,
        fontFamily: fontFamilies('normalTextHeader'),
        fontSize: 20,
        color: colors.skyBlue
    },
    docName: {
        marginVertical: 5,
        fontSize: 20,
        color: colors.black
    },
    buttonCOntainer: {
        marginVertical: 10,
        width: '90%'
    },
    buttonsRow: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center'
    },
    buttonCOntainerRow: {
        flex: 1,
        margin: 10
    }
});

const makeCalenderString = (date, time) => {
    const dateString = moment(date).format('YYYY-MM-DD');
    const toReturn = dateString + "T" + time + ":00.000";
    return moment(toReturn).toISOString();
}