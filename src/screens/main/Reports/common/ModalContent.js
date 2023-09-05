import React, { useState, useRef } from 'react';
import { View, I18nManager, StyleSheet } from 'react-native';
import { Text, PrimaryButton, TouchableOpacity, FilterOverModal } from '../../../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { i18n, colors, WP, fontFamilies } from '../../../../services';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker'

const ModalContent = ({ doctors, services, filter, cancelFilter, show, setShow }) => {
    const [showDoctor, setShowDoctor] = useState(false);
    const [showService, setShowService] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState();
    const [selectedService, setSelectedService] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const clearValues = useRef(true);
    const snap = useRef({
        selectedDoctor: undefined,
        selectedService: undefined,
        selectedDate: undefined,
    });

    const onModalHide = () => {
        if (clearValues.current) {
            const {
                selectedDoctor,
                selectedService,
                selectedDate
            } = snap.current;
            setSelectedDoctor(selectedDoctor);
            setSelectedService(selectedService);
            setSelectedDate(selectedDate);
        } else {
            snap.current = {
                selectedDate,
                selectedDoctor,
                selectedService
            };
            clearValues.current = true;
        }
    }

    return (
        <Modal
            useNativeDriver
            backdropColor={colors.modalBackDrop}
            onModalHide={onModalHide}
            isVisible={show}
            style={styles().bottomModal}
            onBackdropPress={() => setShow(false)}>
            {snap.current.selectedDate ||
                snap.current.selectedDoctor ||
                snap.current.selectedService ?
                <TouchableOpacity
                    onPress={() => {
                        snap.current = {
                            selectedDoctor: undefined,
                            selectedService: undefined,
                            selectedDate: undefined,
                        }
                        setShow(false);
                        filter({});
                    }}
                    style={styles().clearButton}>
                    <MaterialIcons name="clear-all" size={17} color={colors.black} />
                    <Text style={styles().clearText}>
                        {i18n.t('reportsTabTranslations.clear')}
                    </Text>
                </TouchableOpacity>
                : null}
            <View style={styles().modalContent}>
                <View style={styles().modalContenHeaderStyle}></View>
                <Text style={styles().selectTextStyle}>{i18n.t('reportsTabTranslations.sortResult')}</Text>
                <TouchableOpacity style={styles().inputStyle} onPress={() => setShowDoctor(true)}>
                    <View style={styles().filterStyle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Fontisto name={'doctor'} size={30} color={colors.black} />
                            <Text style={{ color: colors.black, marginLeft: 10 }}>{
                                selectedDoctor ? selectedDoctor : i18n.t('reportsTabTranslations.byDoctor')
                            }</Text>
                        </View>
                        {showDoctor ?
                            <AntDesign name='caretup' size={17} color={colors.lightGrey} /> :
                            <AntDesign name='caretdown' size={17} color={colors.lightGrey} />
                        }
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles().inputStyle} onPress={() => setShowService(true)}>
                    <View style={styles().filterStyle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign name={'profile'} size={30} color={colors.black} />
                            <Text style={{ color: colors.black, marginLeft: 10 }}>{
                                selectedService ? selectedService : i18n.t('reportsTabTranslations.byService')
                            }</Text>
                        </View>
                        {showService ?
                            <AntDesign name='caretup' size={17} color={colors.lightGrey} /> :
                            <AntDesign name='caretdown' size={17} color={colors.lightGrey} />
                        }
                    </View>
                </TouchableOpacity>
                <DatePicker
                    style={styles().inputStyle}
                    date={selectedDate}
                    mode="date"
                    placeholder={i18n.t('reportsTabTranslations.byDate')}
                    format="YYYY-MM-DD"
                    confirmBtnText={i18n.t('reportsTabTranslations.confirm')}
                    cancelBtnText={i18n.t('reportsTabTranslations.cancel')}
                    showIcon={true}
                    iconComponent={
                        <MaterialCommunityIcons name={'calendar-check'} size={30} color={colors.black} style={{ position: 'absolute', left: 0, marginRight: 0 }} />
                    }
                    customStyles={{
                        dateInput: {
                            marginVertical: 5,
                            width: WP('87'),
                            height: 50,
                            justifyContent: 'center',
                            borderColor: 'transparent',
                            padding: 10,
                            borderRadius: 5
                        },
                        dateText: {
                            fontFamily: fontFamilies('normalText'),
                            textAlign: 'left',
                            width: '100%',
                            marginLeft: 55,
                            color: colors.black
                        },
                        placeholderText: {
                            fontFamily: fontFamilies('normalText'),
                            textAlign: 'left',
                            width: '100%',
                            marginLeft: 55,
                            color: colors.black
                        },

                    }}
                    onDateChange={(date) => setSelectedDate(date)}
                />
                <PrimaryButton
                    onPress={() => {
                        clearValues.current = false;
                        filter({
                            date: selectedDate,
                            doctor: selectedDoctor,
                            service: selectedService
                        });
                        setShow(false);
                    }}>
                    {i18n.t('reportsTabTranslations.apply')}
                </PrimaryButton>
                <PrimaryButton
                    onPress={cancelFilter}
                    buttonStyle={{ backgroundColor: colors.secondary }}
                    containerStyle={{ marginTop: 0 }}>
                    {i18n.t('reportsTabTranslations.cancel')}
                </PrimaryButton>
            </View>

            {showDoctor ?
                <FilterOverModal
                    data={doctors}
                    onSelect={(doc) => {
                        setSelectedDoctor(doc);
                        setShowDoctor(false);
                    }}
                    onPressCancel={() => setShowDoctor(false)}
                    headerText={i18n.t('reportsTabTranslations.selectDoctor')}
                    buttonText={i18n.t('reportsTabTranslations.cancel')} />
                : null}
            {showService ?
                <FilterOverModal
                    data={services}
                    onSelect={(service) => {
                        setSelectedService(service);
                        setShowService(false);
                    }}
                    onPressCancel={() => setShowService(false)}
                    headerText={i18n.t('reportsTabTranslations.selectService')}
                    buttonText={i18n.t('reportsTabTranslations.cancel')} />
                : null}
        </Modal>
    );
}

export default ModalContent;

export const Item = ({ name, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            flex: 1, height: 30, backgroundColor: colors.extraLightGrey, padding: 4,
            borderRadius: 4, marginVertical: 2
        }} >
            <Text style={{ textAlign: 'center', fontSize: 15, color: colors.black }}>
                {name}
            </Text>
        </TouchableOpacity>
    )
};


const styles = () => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whiteBg
    },
    selectContent: {
        backgroundColor: colors.white,
        borderRadius: 5,
        padding: 20,

    },
    filterStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    selectModal: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        zIndex: 5,
        justifyContent: 'center'
    },
    selectHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
    },
    inputStyle: {
        marginVertical: 7,
        borderWidth: 1,
        width: WP('87'),
        backgroundColor: colors.whiteBg,
        height: 50,
        justifyContent: 'center',
        borderColor: '#F0F0F0',
        padding: 10,
        borderRadius: 5
    },

    rltInput: {
        textAlign: 'right'
    },
    modalContenHeaderStyle: {
        height: 6,
        width: 48,
        backgroundColor: '#E0E0E0',
        alignSelf: 'center',
        borderRadius: 15
    },
    selectTextStyle: {
        color: colors.black,
        fontSize: 16,
        marginBottom: 25,
        marginTop: 25,
        fontFamily: fontFamilies('boldText')
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: colors.whiteBg,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backTouch: {
        borderColor: '#CCCCCC',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    modalContent: {
        backgroundColor: colors.white,
        padding: 25,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 30,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        zIndex: 1
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    clearButton: {
        alignSelf: 'flex-end',
        backgroundColor: colors.whiteBg,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        borderRadius: 30,
    },
    clearText: {
        paddingHorizontal: 10,
    }
})