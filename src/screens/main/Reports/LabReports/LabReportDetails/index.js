import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, FlatList, Alert } from 'react-native';
import { LoadingWrapper } from '../../../../../components';
import { i18n, WP, colors, fontFamilies, convertFromArabic } from '../../../../../services/index';
import { apis } from '../../../../../services';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Text from '../../../../../components/generic/Text';
import InputWithLabel from '../../../../../components/inputs/InputWithLabel';
import moment from 'moment';
import ResultItem from './ResultItem';
import PrimaryButton from '../../../../../components/buttons/PrimaryButton';
import { useSelector, connect } from 'react-redux';
import { getLabReportDetails } from '../../../../../store/actions';
import SharePlatforms from '../../../../../components/SharePlatforms';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import Share from 'react-native-share';

const LabReportDetails = ({ navigation, route, getLabReportDetails }) => {
    const [loading, setLoading] = useState(true);
    const [patCode, setPatCode] = useState(null);
    const [labInfo, setLabInfo] = useState(null);
    const [filePath, setfilePath] = useState(null);
    const [ModalVisible, setModalVisible] = useState(false);
    const labResults = useSelector(state => state.reports.labReportsDetails);

    const printPDF = async () => {
        console.log('printPDF');
        const results = await RNHTMLtoPDF.convert({
            html: htmlContent(),
            fileName: 'Udh',
            base64: true,
        })
        console.log('results', results);
        await RNPrint.print({ filePath: results.filePath })
    }

    const ShareFile = async () => {
        const results = await RNHTMLtoPDF.convert({
            html: htmlContent(),
            fileName: 'Udh',
            base64: true,
        })
        console.log('results', results);
        let options = {
            title: labInfo?.SERV_ENAME,
            message: "This is my report",
            // social: social,
            // url: `data:file/pdf;base64,${results.base64}`,
            url: "file:///" + results.filePath,
            filename: labInfo?.SERV_ENAME
        }
        await Share.open(options)
    }

    const htmlContent = () => {
        return (
            `
            <img src="https://eservices.udh.sa/assets/img/blue.png" style="display: block;
            margin-left: auto;
            margin-right: auto;
            width: 25%;" />
            <h1 style=" text-align: center; ">Laboratory Results Sheet</h1>
            <style>    
            table, th, td {    
            border: 1px solid black;  
            margin-left: auto;  
            margin-right: auto;  
            border-collapse: collapse;    
            width: 700px;  
            text-align: center;  
            font-size: 20px;  
            }   
            span {
                display: inline-block;
                width: 200px; // or whatever
           } 
            </style> 
            <ul>
                <li>
                    <span style="display: inline-block; width: 65%; ">Patient Name : ${labInfo?.PAT_ENAME}</span>
                    <span>Gender : ${labInfo?.gender}</span>
                </li>
            </ul>
            <ul>
                <li>
                    <span style="display: inline-block; width: 65%; " >Doctor : ${labInfo?.DOC_ENAME}</span>
                    <span>Profile No : ${patCode}</span>
                </li>
            </ul>
            <ul>
                <li>
                    <span style="display: inline-block; width: 65%; " >Lab Date : ${labInfo?.DENOTED_DATE}</span>
                    <span>Age : ${labInfo?.DATE_BIRTH} years</span>
                </li>
            </ul>
            <h2 style=" text-align: center; ">${labInfo?.SERV_ENAME}</h2>
            <table> 
            <thead> 
                <tr>  
                <th>Test</th>  
                <th>Result</th>  
                <th colspan="2">Range (Male)</th>
                <th>Unit</th>  
                </tr>  
                <tr>
                <th></th>
                <th></th>
                <th>From</th>
                <th>To</th>
                <th></th>
                </tr>
                </thead>
                <tbody>
                ${labResults.map((item, i) => {
                return (
                    `<tr key=${i}>
                             <td>${item.SUB_TITLE}</td>
                             <td>${item.RESULT1}</td>
                             <td>${item.RANGEFM == null ? ' ' : item.RANGEFM}</td>
                             <td>${item.RANGETM == null ? ' ' : item.RANGETM}</td>
                             <td>${item.TITLE_END == null ? ' ' : item.TITLE_END}</td> 
                         </tr>`
                )
            })}
                </tbody> 
                </table> 
                <h3 style=" text-align: center; ">This report generated by mobile. Any manual correction will void it.</h3>
        `
        )
    }

    useEffect(() => {
        if (route.params?.data && !labInfo) {
            setPatCode(route.params.data.patCode.trim());
            const patientCode = route.params.data.patCode.trim();
            const mobileNumber = route.params.data.mobileNo.trim();
            const labCode = route.params.data.LAB_CODE.trim();
            const servCode = route.params.data.SERV_CODE.trim();

            const cbSuccess = data => {
                if (data.Success) {
                    if (data.labInfo) {
                        let temp = [...data.labInfo];
                        for (let i = 0; i < temp.length; i++) {
                            if (temp[i].SERV_CODE.toString().trim() == servCode.trim()) {
                                temp[i].DATE_BIRTH = moment(temp[i].DATE_BIRTH).from(moment(), true).split('years')[0];
                                temp[i].gender = temp[i].SEX.toString().toUpperCase() == 'M' ? i18n.t('labReportDetails.male') : i18n.t('labReportDetails.female')
                                temp[i].DENOTED_DATE = moment(temp[i].DENOTED_DATE).format('YYYY-MM-DD');
                                setLabInfo(temp[i]);
                            }
                        }
                    }
                }
                setLoading(false);
            }
            const cbFailure = () => {
                setLoading(false);
            }
            getLabReportDetails(`?patCode=${convertFromArabic(patientCode)}&mobileNumber=${convertFromArabic(mobileNumber)}&labCode=${convertFromArabic(labCode)}&servCode=${convertFromArabic(servCode)}`, cbSuccess, cbFailure);
        }
    }, [])
    return (
        <LoadingWrapper white navigation={navigation} loading={loading} header>
            {labResults ?
                <ScrollView showsVerticalScrollIndicator={false}>
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
                                <InputWithLabel color={colors.darkGrey} transparent value={labInfo?.PAT_ENAME} disabled={true}>{i18n.t('labReportDetails.patientName')}</InputWithLabel>
                                <InputWithLabel color={colors.darkGrey} transparent value={patCode} disabled={true}> {i18n.t('labReportDetails.profileNo')}</InputWithLabel>
                                <InputWithLabel color={colors.darkGrey} transparent value={labInfo?.gender} disabled={true}>{i18n.t('labReportDetails.gender')}</InputWithLabel>
                                <InputWithLabel color={colors.darkGrey} transparent value={labInfo?.DATE_BIRTH} disabled={true}>{i18n.t('labReportDetails.age')}</InputWithLabel>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <PrimaryButton onPress={printPDF}
                                buttonStyle={{ marginVertical: 5, width: "45%" }}>{i18n.t('labReportDetails.downloadNow')}</PrimaryButton>
                            <PrimaryButton onPress={ShareFile}
                                buttonStyle={{ marginVertical: 5, width: "45%" }}>{i18n.t('inpatientGallery.share')}</PrimaryButton>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles().iconWrapper}>
                                    <FontAwesome name={'heartbeat'} size={15} color='#3094E8' />
                                </View>
                                <View>
                                    <Text style={styles().infoStyle}>
                                        {i18n.t('labReportDetails.resultInfo')}
                                    </Text>
                                </View>
                            </View>
                            {labResults.map((el, i) => (
                                <ResultItem
                                    key={i}
                                    labInfo={labInfo}
                                    data={el}
                                    navigation={navigation} />
                            ))}
                        </View>
                        <View>
                            <PrimaryButton onPress={() => navigation.goBack()}
                                buttonStyle={{ marginVertical: 5 }}> {i18n.t('labReportDetails.ok')}</PrimaryButton>
                        </View>
                        <View style={{ height: 50 }}></View>
                    </View>
                </ScrollView>
                : null}
            <SharePlatforms ModalVisible={ModalVisible}
                Visible={() => setModalVisible(false)}
                SetConfig={(type) => ShareFile(type)} />
        </LoadingWrapper>
    )
}

export default connect(null, { getLabReportDetails })(LabReportDetails);


const styles = () => StyleSheet.create({
    iconWrapper: { padding: 6, backgroundColor: '#D6E9FA', borderRadius: 7 },
    infoStyle: {
        fontSize: 15,
        marginLeft: 12,
        color: colors.black,
        fontFamily: fontFamilies('boldText')
    }
})



// var social;
//         if (type == 'WHATSAPP') {
//             social = Share.Social.WHATSAPP
//         } else if (type == 'TWITTER') {
//             social = Share.Social.TWITTER
//         } else if (type == 'TELEGRAM') {
//             social = Share.Social.TELEGRAM
//         } else if (type == 'PINTEREST') {
//             social = Share.Social.PINTEREST
//         } else if (type == 'LINKEDIN') {
//             social = Share.Social.LINKEDIN
//         } else if (type == 'WHATSAPPBUSINESS') {
//             social = Share.Social.WHATSAPPBUSINESS
//         } else if (type == 'INSTAGRAM') {
//             social = Share.Social.INSTAGRAM
//         } else if (type == 'GOOGLEPLUS') {
//             social = Share.Social.GOOGLEPLUS
//         } else if (type == 'FACEBOOK') {
//             social = Share.Social.FACEBOOK
//         } else if (type == 'EMAIL') {
//             social = Share.Social.EMAIL
//         }
