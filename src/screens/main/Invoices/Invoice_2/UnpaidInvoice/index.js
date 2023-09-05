// import React, { useEffect, useState, useRef } from 'react'
// import { LoadingWrapper, DoctorListItem, Text, DateSelector, NetworkError, TouchableOpacity, NoResults } from '../../../../../components';
// import { View, TextInput, FlatList,Image,SafeAreaView,ScrollView, Button } from 'react-native';
// import styles from './style';
// // import Icon from 'react-native-vector-icons/Ionicons';
// import { colors, i18n, appointmentReducersTypes,images } from '../../../../../services';
// import { useSelector, connect } from 'react-redux';
// import { getDoctorsList, getAllDoctors } from '../../../../../store/actions';
// import moment from 'moment';
// import ids from '../../../../../../ids';
// import FilterModal from './FilterModal';
// import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Collapsible from 'react-native-collapsible';
// import * as Animatable from 'react-native-animatable';
// import PrimaryButton from '../../../../../components/buttons/PrimaryButton';
// import Accordion from 'react-native-collapsible/Accordion';

// const {
//     SET_LOADER
// } = appointmentReducersTypes;
// const checkMarkSize = 15;
// const viewRender = () =>{
//     return (
//         <View style={styles().innerContainer}>
//             <View style={styles().innerCard}>
//                 <View>
//                     <Image source={images.udhLogo}   style={styles().imageS}  />
//                 </View>
//                 <Text style={styles().headerTitle}>{i18n.t('homeTabTranslations.header')}</Text>
//                 <Text style={styles().invoiceSummary}>{i18n.t('invoiceTabTranslations.invoiceSummary')}</Text>
//                 <View style={{flex: 1, flexDirection: 'row',flexWrap: "wrap"}}>
//                     <View style={{flex:1}}>
//                         <Text style={[styles().invoiceSummaryDetail,styles().paddingLeft]}>{i18n.t('invoiceTabTranslations.invoiceNo')}</Text>
//                     </View>
//                     <View style={{flex:1}}>
//                         <Text style={styles().invoiceSummaryDetail}>{i18n.t('invoiceTabTranslations.invoiceDate')}</Text>
//                     </View>
//                     <View style={{flex:1}}>
//                         <Text style={styles().invoiceSummaryDetail}>{i18n.t('invoiceTabTranslations.doctorName')}</Text>
//                     </View>
//                 </View>

//                 <View style={styles().flexWrap}>
//                     <View style={{flex:1}}>
//                         <Text style={styles().invoiceSummaryDetailText}>8967564</Text>
//                     </View>
//                     <View style={{flex:1}}>
//                         <Text style={styles().invoiceSummaryDetailText}>Mar 13.2021</Text>
//                     </View>
//                     <View style={{flex:1}}>
//                         <Text style={styles().invoiceSummaryDetailText}>Dr. Eman Ali</Text>
//                     </View>

//                 </View>

//                 <View style={styles().flexWrap}>
//                     <View style={{flex:1}}>
//                         <Text style={[styles().invoiceSummaryDetail,styles().paddingLeft]}>{i18n.t('invoiceTabTranslations.Patient')}</Text>
//                     </View>
//                     <View style={{flex:1}}>
//                         <Text style={styles().invoiceSummaryDetail}>{i18n.t('invoiceTabTranslations.ProfileNo')}</Text>
//                     </View>
//                     <View style={{flex:1}}>
//                         <Text style={styles().invoiceSummaryDetail}>{i18n.t('invoiceTabTranslations.idNo')}</Text>
//                     </View>
//                 </View>

//                 <View style={styles().flexWrap}>
//                     <View style={{flex:1}}>
//                         <Text style={styles().invoiceSummaryDetailText}>Ali</Text>
//                     </View>
//                     <View style={{flex:1}}>
//                         <Text style={styles().invoiceSummaryDetailText}>200</Text>
//                     </View>
//                     <View style={{flex:1}}>
//                         <Text style={styles().invoiceSummaryDetailText}>1**566</Text>
//                     </View>
//                 </View>

//                 <View style={styles().flexWrap}>
//                     <View style={{flex:1}}>
//                         <Text style={[styles().invoiceSummaryDetail,styles().paddingLeft]}>{i18n.t('invoiceTabTranslations.Patient')}</Text>
//                     </View>
//                     <View style={{flex:1}}>
//                         <Text style={styles().invoiceSummaryDetailText}>8967</Text>
//                     </View>
//                 </View>
//                 <View style={styles().flexWrap}>
//                     <View style={{flex:1}}>
//                         <Text style={[styles().invoiceSummaryDetail,styles().paddingLeft]}>{i18n.t('invoiceTabTranslations.vat')}</Text>
//                     </View>
//                     <View style={{flex:1}}>
//                         <Text style={styles().invoiceSummaryDetailText}>8967</Text>
//                     </View>
//                 </View>
//                 <View style={styles().flexWrap}>
//                     <View style={{flex:1}}>
//                         <Text style={[styles().invoiceSummaryDetail,styles().paddingLeft]}>{i18n.t('invoiceTabTranslations.total')}</Text>
//                     </View>
//                     <View style={{flex:1}}>
//                         <Text style={styles().invoiceSummaryDetailText}>67.00</Text>
//                     </View>
//                 </View>
//                 <View style={styles().flexWrap}>
//                     <View style={{flex:1}}>
//                         <Text style={[styles().invoiceSummaryDetail,styles().paddingLeft]}>{i18n.t('invoiceTabTranslations.paidAmount')}</Text>
//                     </View>
//                     <View style={{flex:1}}>
//                         <Text style={styles().invoiceSummaryDetailText}>8967.00</Text>
//                     </View>
//                 </View>
//                 <View style={styles().flexWrap}>
//                     <View style={{flex:1}}>
//                         <Text style={[styles().invoiceSummaryDetail,styles().paddingLeft,styles().amountColor]}>{i18n.t('invoiceTabTranslations.amountDue')}</Text>
//                     </View>
//                     <View style={{flex:1}}>
//                         <Text style={[styles().invoiceSummaryDetailText,styles().amountColor]}>34.00</Text>
//                     </View>
//                 </View>
//                 <View style={{padding:10}}>
//                     <View style={{padding:10,backgroundColor:'#28d094',textAlign:'center',padding:10,borderRadius:5}}>
//                         <Text style={{color:'#FFFFFF',textAlign:'center',fontSize:18,fontWeight:'bold'}}>
//                             {i18n.t('invoiceTabTranslations.payNow')}
//                         </Text>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     );
// }
// const viewContentRender = () =>{
//     return (
//         <View>
//             <View style={styles().card}>
//                 <View style={{flex: 1, flexDirection: 'row',flexWrap: "wrap"}}>
//                     <View style={styles().invoice}>
//                         <Image source={images.file}   style={styles().imageStyle}  />
//                     </View>
//                     <View style={{flex:1}}>
//                         <View style={{flex: 1, flexDirection: 'row',padding:1,flexWrap: "wrap"}}>
//                             <View style={{flex:1}}>
//                                 <Text style={styles().invoiceNo}>
//                                     Invoice No #566
//                                 </Text>
//                             </View>
//                             <View>
//                                 <Text style={styles().payText}>
//                                 {i18n.t('invoiceTabTranslations.pay')}
//                                 </Text>
//                             </View>
//                         </View>

//                         <View style={{flex: 1, flexDirection: 'row',padding:1,flexWrap: "wrap",marginTop:15}}>
//                             <View style={{flex:1}}>
//                                 <Text>
//                                     <Icon
//                                         name='file'
//                                         size={checkMarkSize}
//                                         color={"#c0c0c0"}
//                                     />
//                                     2021
//                                 </Text>
//                             </View>
//                                 <View style={{flex:1}}>
//                                 <Text>
//                                         <Icon
//                                             name='file'
//                                             size={checkMarkSize}
//                                             color={"#c0c0c0"}
//                                         />
//                                         <Text style={{color:colors.primary}}>2021</Text>SAR
//                                     </Text>
//                                 </View>
//                                 <View style={{flex:1}}>
//                                     <Text>
//                                         <Icon
//                                             name='calendar'
//                                             size={checkMarkSize}
//                                             color={"#c0c0c0"}
//                                         />
//                                         2021/02/23

//                                     </Text>

//                                 </View>
//                             <View>
//                                 <Icon style={{marginTop:7}}
//                                     name='chevron-double-down'
//                                     size={checkMarkSize}
//                                 />
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         </View>

//     );
// }

// const CONTENT = [
//     {
//       title: 'Terms and Conditions',
//       content: 'kkk'
//     },
//     {
//       title: 'Privacy Policy',
//       content:
//         'A Privacy Policy agreement is the agreement where you specify if you collect personal data from your users, what kind of personal data you collect and what you do with that data.',
//     },
//     {
//       title: 'Return Policy',
//       content:
//         'Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision.',
//     },
// ];

// const UnpaidInvoice = ({ navigation, getDoctorsList, route, getAllDoctors, header = true }) => {
//     const {
//         CODE,
//         showFilter,
//         forceSendRequest
//     } = route.params;
//     const [filter, setFilter] = useState('');
//     const [expandedIndex, setExpandedIndex] = useState(-1);
//     const [date, setDate] = useState(moment());
//     const loading = useSelector(state => state.appointments.loading);
//     //start collapsible
//     const [activeSections, setActiveSections] = useState([]);
//     const [multipleSelect, setMultipleSelect] = useState(false);

//     const setSections = (sections) => {
//         setActiveSections(sections.includes(undefined) ? [] : sections);
//     };
//     const renderHeader = (section, _, isActive) => {
//         //Accordion Header view
//         return (
//         <Animatable.View
//             duration={400}
//             style={[styles().header, isActive ? styles().active : styles().inactive]}
//             transition="backgroundColor">
//             {/* <Text style={styles().headerText}>{section.title}</Text> */}
//             {viewContentRender()}
//         </Animatable.View>
//         );
//     };

//     const renderContent = (section, _, isActive) => {
//         //Accordion Content view
//         return (
//         <Animatable.View
//             duration={400}
//             style={[styles().content, isActive ? styles().active : styles().inactive]}
//             transition="backgroundColor">
//                 {viewRender()}

//             {/* <Animatable.Text
//             animation={isActive ? 'bounceIn' : undefined}
//             style={{ textAlign: 'center' }}>
//             mmm
//             </Animatable.Text> */}
//         </Animatable.View>
//         );
//     };
//     //end collapse
//     const doctors = useSelector(state =>
//         CODE ?
//             state.appointments.doctors :
//             state.appointments.allDoctors
//     );
//     const allDoctors = useSelector(state => state.appointments.allDoctors);
//     const [filteredDoctors, setFilteredDoctors] = useState(doctors);

//     return (
//         <LoadingWrapper
//             navigation={navigation}
//             header
//             endIcon={expandedIndex !== -1 ?
//                 <TouchableOpacity onPress={() => {
//                     setExpandedIndex(-1);
//                     setDate(moment());
//                 }} style={styles().closeIcon}>
//                     <Icon name='close-circle' color={colors.grey} size={30} />
//                 </TouchableOpacity>
//                 : showFilter ?
//                     <TouchableOpacity onPress={() => setShowFilterModal(true)} style={styles().filterIcon}>
//                         <Icon name='ios-funnel-outline' color={colors.black} size={15} />
//                     </TouchableOpacity>
//                     : null}
//                     size={100}
//                 headerText={header ? undefined : i18n.t('invoiceTabTranslations.invoices')}
//                 >
//                  <View style={{flex: 1}}>
//                     <SafeAreaView style={{ flex: 1 }}>
//                         <View style={styles().container}>
//                             <ScrollView>
//                             <Accordion
//                                 activeSections={activeSections}
//                                 sections={CONTENT}
//                                 touchableComponent={TouchableOpacity}
//                                 expandMultiple={multipleSelect}
//                                 renderHeader={renderHeader}
//                                 renderContent={renderContent}
//                                 duration={400}
//                                 onChange={setSections}
//                             />
//                             </ScrollView>
//                         </View>
//                         </SafeAreaView>
//                 </View>

//         </LoadingWrapper>
//     )
// }

// export default connect(null, { getDoctorsList, getAllDoctors })(UnpaidInvoice);
