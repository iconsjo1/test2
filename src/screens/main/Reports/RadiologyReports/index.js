import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { CustomHeader, Text, NoResults } from '../../../../components';
import ReportItem from './ReportItem';
import { i18n, WP, colors, images } from '../../../../services';
import { ColorDotsLoader } from 'react-native-indicator';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalContent from '../common/ModalContent';
import { getRadiologyReports } from '../../../../store/actions';
import { connect, useSelector } from 'react-redux';
import moment from 'moment';

const RadiologyReports = ({ navigation, route, headerBar, getRadiologyReports }) => {
    const [loading, setLoading] = useState(true);
    const [mainReports, setMainReports] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [services, setServices] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const reports = useSelector(state => state.reports.radiologyReports);
    const [filteredReports, setFilteredReports] = useState([]);

    useEffect(() => {
        const fileNo = route.params.data.fileNo;
        const phoneNo = route.params.data.foneNo;
        const cbSuccess = ({ doctors, services }) => {
            setDoctors(doctors);
            setServices(services);
            setLoading(false);
        }
        const cbFailure = () => {
            setLoading(false);
        }
        getRadiologyReports(fileNo, phoneNo, cbSuccess, cbFailure);
    }, []);

    useEffect(() => {
        if (reports) setFilteredReports([...reports]);
    }, [reports]);

    const applyFilters = ({ date, doctor, service }) => {
        let filtered = [...reports];
        if (doctor)
            filtered = filtered.filter(el => i18n.locale === 'ar' ? el.DOC_ANAME === doctor : el.DOC_ENAME === doctor);
        if (service)
            filtered = filtered.filter(el => el.SERV_ENAME === service);
        if (date)
            filtered = filtered.filter(el => {
                const date_filter = moment(date);
                const date_el = moment(el.TRS_DATE);
                if (date_filter.format('YYYY-MM-DD') === date_el.format("YYYY-MM-DD"))
                    return true;
                else
                    return false
            });
        setFilteredReports(filtered);
    }

    return (
        <View style={styles().container}>
            <CustomHeader
                endIcon={reports ? reports.length !== 0 ? (
                    <View>
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles().backTouch}>
                            <AntDesign name={'filter'} size={15} color={colors.black} />
                        </TouchableOpacity>
                    </View>
                )
                    : null : null}
                headerBar={headerBar}
                navigation={navigation} />
            {loading ?
                <View style={styles().loadingContainer}>
                    <ColorDotsLoader size={20} betweenSpace={7} />
                </View>
                :
                <View style={{ flex: 1 }}>
                    {
                        (filteredReports.length > 0) ?
                            <FlatList
                                style={{ width: WP('100') }}
                                data={filteredReports}
                                keyExtractor={(el, i) => String(i)}
                                renderItem={({ item, index }) => <ReportItem
                                    data={{
                                        ...item,
                                        patCode: route.params.data.fileNo,
                                        mobileNo: route.params.data.foneNo
                                    }}
                                    first={index === 0}
                                    last={index === filteredReports.length - 1}
                                    navigation={navigation} />}
                            />
                            :
                            <NoResults text={i18n.t('reportsTabTranslations.NoReaports')} />

                    }
                </View>
            }

            <ModalContent
                doctors={doctors}
                services={services}
                show={modalVisible}
                setShow={setModalVisible}
                filter={applyFilters}
                cancelFilter={() => setModalVisible(false)} />
        </View>
    )
}

export default connect(null, { getRadiologyReports })(RadiologyReports);

export const unique = (value, index, self) => {
    return self.indexOf(value) === index
}
const styles = () => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    inputStyle: {
        marginVertical: 5,
        borderWidth: 1,
        width: WP('87'),
        backgroundColor: colors.white,
        height: 50,
        borderColor: '#F0F0F0',
        padding: 10,
        color: colors.black,
        fontSize: 15,
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
        fontWeight: 'bold'
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: colors.white,
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
        padding: 22,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 30,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    noReportsContainer: {
        flex: 1,
        padding: WP('20'),
        alignItems: 'center'
    },
    noSearchResult: {
        width: WP('50'),
        height: WP('50'),
        maxWidth: 200,
        maxHeight: 200,
        marginVertical: 30
    }
})