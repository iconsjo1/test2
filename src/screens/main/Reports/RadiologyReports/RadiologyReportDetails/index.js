import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, FlatList, Dimensions, Alert } from 'react-native';
import { LoadingWrapper } from '../../../../../components';
import { i18n, WP, colors, fontFamilies, convertFromArabic } from '../../../../../services/index';
import { apis } from '../../../../../services';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Text } from '../../../../../components';
import InputWithLabel from '../../../../../components/inputs/InputWithLabel';
import moment from 'moment';
import PrimaryButton from '../../../../../components/buttons/PrimaryButton';
import HTML from 'react-native-render-html';
import { getRadiologyReportDetails } from '../../../../../store/actions';
import { connect, useSelector } from 'react-redux';

const RadiologyReportDetails = ({ navigation, route, getRadiologyReportDetails }) => {
    const [loading, setLoading] = useState(true);
    const [patCode, setPatCode] = useState(null);
    const [xrayInfo, setXrayInfo] = useState(null);
    const [xrayResult, setXrayResults] = useState([]);
    const [impressionStart, setImpressionStart] = useState(null);
    const reportDetail = useSelector(state => state.reports.radiologyReportsDetails)

    useEffect(() => {
        if (route.params) {
            setPatCode(route.params.patCode.trim());
            const mobileNumber = route.params.mobileNo.trim();
            const transCode = route.params.TRS_NO;
            const servCode = route.params.SERV_CODE.trim();

            const cbSuccess = data => {
                if (data.Result) {
                    let tempResult = data.Result[0]
                    let date = new Date(tempResult.TRS_DATE)
                    tempResult.TRS_DATE = date
                    let temp;
                    tempResult.XRAY_RESULT = tempResult.XRAY_RESULT.replace(':Clinical', ': Clinical')
                    tempResult.XRAY_RESULT = tempResult.XRAY_RESULT.replace(':CLINICAL', ': CLINICAL')
                    temp = tempResult.XRAY_RESULT.split(' ');
                    let word = '';
                    let clinicalStart;
                    let clinicalEnd = temp.length;
                    let impressionEnd = temp.length - 1;
                    for (let i = 0; i < temp.length; i++) {
                        word = temp[i];
                        if (word[word.length - 1] == ':') {
                            temp[i] = `${word}<br/>`;
                        }
                        if (word[0] == '-' || word[1] == '-' || word == '-') {
                            temp[i] = `<br/>${word}`;
                        }

                        if (word.includes(':')) {
                            temp[i] = word.replace(':', ':<br/>');
                        }
                        if (word.substring(0, word.length - 1).toUpperCase() == 'IMPRESSION') {
                            temp[i] = `<br/><bllr/><b class='bg-light'>${word}</b><br/>`;
                            clinicalEnd = i
                            setImpressionStart(i + 1)
                        }
                        if (word.substring(0, word.length - 1).toUpperCase() == 'DATA'
                            && temp[i - 1].substring(0, temp[i - 1].length).toUpperCase().includes('CLINICAL')) {
                            tempResult.TITLE = `<div class='wrapper'> ${temp.slice(0, i - 1).join(" ").replace("<br/>", "")} </div>`
                            temp[i - 1] = `<br/><b class='bg-light'>${temp[i - 1]}`;
                            temp[i] = `${word}</b><br/>`;
                            clinicalStart = i + 1
                        }
                    }
                    tempResult.XRAY_RESULT = temp.join(' ');
                    if (impressionStart)
                        tempResult.IMPRESSION_RESULT = `<div class='wrapper'> ${temp.slice(impressionStart, impressionEnd).join(" ").replace("<br/>", "")}</div>`
                    tempResult.CLINICAL_RESULT = `<div class='wrapper'> ${temp.slice(clinicalStart, clinicalEnd).join(" ").replace("<br/>", "")}  </div>`;
                    if (!temp.map(e => e.toUpperCase()).includes("clinical") && !temp.map(e => e.toUpperCase()).includes("data") && !clinicalStart) {
                        tempResult.TITLE = tempResult.CLINICAL_RESULT
                        tempResult.CLINICAL_RESULT = null
                    }
                    setXrayResults(tempResult);
                    if (data.xrayInfo) {
                        let tempInfo = data.xrayInfo[0];
                        tempInfo.DATE_BIRTH = moment(tempInfo.DATE_BIRTH).from(moment(), true);
                        tempInfo.gender = tempInfo.SEX.toString().toUpperCase() == 'M' ? i18n.t('labReportDetails.male') : i18n.t('labReportDetails.female');
                        setXrayInfo(tempInfo);
                    }
                }
                setLoading(false)
            }

            const cbFailure = () => {
                setLoading(false);
            }

            getRadiologyReportDetails(`?patCode=${convertFromArabic(route.params.patCode.trim())}&mobileNumber=${convertFromArabic(mobileNumber)}&transNumber=${convertFromArabic(transCode)}&serviceCode=${convertFromArabic(servCode)}`, cbSuccess, cbFailure);
        }
    }, []);

    return (
        <LoadingWrapper white navigation={navigation} loading={loading} header>
            <ScrollView>
                <View style={{ width: WP('87'), alignSelf: 'center' }}>
                    <View style={{ paddingVertical: 15 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles().iconWrapper}>
                                <FontAwesome name={'bar-chart-o'} size={15} color='#3094E8' />
                            </View>
                            <View>
                                <Text style={styles().infoStyle}>
                                    {i18n.t('labReportDetails.basicInfo')}
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <InputWithLabel value={xrayInfo?.PAT_ENAME} disabled={true}>{i18n.t('labReportDetails.patientName')}</InputWithLabel>
                            <InputWithLabel value={patCode} disabled={true}> {i18n.t('labReportDetails.profileNo')}</InputWithLabel>
                            <InputWithLabel value={xrayInfo?.gender} disabled={true}>{i18n.t('labReportDetails.gender')}</InputWithLabel>
                            <InputWithLabel value={xrayInfo?.DATE_BIRTH} disabled={true}>{i18n.t('labReportDetails.age')}</InputWithLabel>
                            <InputWithLabel value={xrayResult?.DOC_ENAME} disabled={true}>{i18n.t('labReportDetails.docName')}</InputWithLabel>
                            <InputWithLabel value={xrayResult?.TRS_DATE?.toDateString()} disabled={true}>{i18n.t('labReportDetails.reportDate')}</InputWithLabel>
                        </View>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles().iconWrapper}>
                                <AntDesign name={'profile'} size={15} color='#3094E8' />
                            </View>
                            <View>
                                <Text style={styles().infoStyle}>
                                    {i18n.t('labReportDetails.radiologyReport')}
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            {/* <View>
                                <Text style={{ marginVertical: 5, textAlign: 'left' }}>{i18n.t('labReportDetails.title')}</Text>
                                <HTML html={xrayResult.TITLE} imagesMaxWidth={Dimensions.get('window').width} classesStyles={classesStyles} />
                            </View>
                            {
                                xrayResult.CLINICAL_RESULT ?
                                    <View>
                                        <Text style={{ marginVertical: 5, textAlign: 'left' }}>{i18n.t('labReportDetails.clinicData')}:</Text>
                                        <HTML html={xrayResult.CLINICAL_RESULT} imagesMaxWidth={Dimensions.get('window').width} classesStyles={classesStyles} />
                                    </View>
                                    :
                                    <View></View>
                            }
                            {
                                impressionStart ?
                                    <View>
                                        <Text style={{ marginVertical: 5, textAlign: 'left' }}>{i18n.t('labReportDetails.impression')}</Text>
                                        <HTML html={xrayResult.IMPRESSION_RESULT} imagesMaxWidth={Dimensions.get('window').width} classesStyles={classesStyles} />
                                    </View>
                                    :
                                    <View></View>
                            } */}
                            {reportDetail ?
                                <HTML
                                    baseFontStyle={{
                                        color: colors.darkGrey
                                    }}
                                    html={reportDetail[0].XRAY_RESULT.trim()}
                                    classesStyles={classesStyles} />
                                : null}
                        </View>
                    </View>
                    <View style={{ marginVertical: 60 }}>
                        <PrimaryButton onPress={() => navigation.goBack()} buttonStyle={{ marginVertical: 5 }}> {i18n.t('labReportDetails.ok')}</PrimaryButton>
                        {/* <PrimaryButton buttonStyle={{ marginVertical: 5 }}>{i18n.t('labReportDetails.downloadNow')}</PrimaryButton> */}
                    </View>
                </View>
            </ScrollView>
        </LoadingWrapper>
    )
}
const styles = () => StyleSheet.create({
    iconWrapper: { padding: 6, backgroundColor: '#D6E9FA', borderRadius: 7 },
    infoStyle: {
        fontSize: 15,
        marginLeft: 12,
        color: colors.black,
        fontFamily: fontFamilies('boldText')
    },

})
const classesStyles = {
    'wrapper': {
        textAlign: 'left',
        padding: 10,
        borderWidth: 1,
        borderColor: colors.lightGrey,
        backgroundColor: colors.white,
        color: colors.black,
        borderRadius: 5,
        fontFamily: fontFamilies('normalText'),
    },
    'body': {
        textAlign: 'left',
        padding: 10,
        borderWidth: 1,
        borderColor: colors.lightGrey,
        backgroundColor: colors.white,
        color: colors.black,
        borderRadius: 5,
        fontFamily: fontFamilies('normalText'),
    }
}

export default connect(null, { getRadiologyReportDetails })(RadiologyReportDetails);