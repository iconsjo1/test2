// import React, { useEffect, useState } from 'react'
// import { LoadingWrapper, SpecialitySelector, Text, NetworkError } from '../../../../../components';
// import { View, ScrollView, TextInput, FlatList,Image,TouchableOpacity,SafeAreaView,Switch } from 'react-native';
// import styles from './styles';
// // import Icon from 'react-native-vector-icons/Ionicons';
// import { colors, i18n, routesNames,images } from '../../../../../services';
// import { useSelector, connect } from 'react-redux';
// import { getAllSpecialities } from '../../../../../store/actions';
// import ids from '../../../../../../ids';
// // import style from '../UnpaidInvoice/style';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
// import Collapsible from 'react-native-collapsible';
// import * as Animatable from 'react-native-animatable';
// import PrimaryButton from '../../../../../components/buttons/PrimaryButton';

// //import for the Accordion view
// import Accordion from 'react-native-collapsible/Accordion';

// const checkMarkSize = 15;

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

// const PaidInvoice = ({ navigation, getAllSpecialities, header = true }) => {
//     const [filter, setFilter] = useState('');
//     // const [invoice, setInvoice] = useState(10);
//     const loading = useSelector(state => state.appointments.loading);
//     const specialities = useSelector(state => state.appointments.specialities);
//     // start
//     const [activeSections, setActiveSections] = useState([]);
//     const [multipleSelect, setMultipleSelect] = useState(false);
//     const [expanded , setExpanded ] = useState(true);
//     const [upImage , setUpImage ] = useState(true);
//     const [downImage , setDownImage ] = useState(true);
//     const [collapsed, setCollapsed] = useState(true);

//     const toggleExpanded = () => {
//         // Toggling the state of single Collapsible
//         setCollapsed(!collapsed);
//       };

//     const toggle =()=>{
//         setExpanded(!expanded);
//         console.log('data ex',expanded)
//     //     let
//     //     initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
//     //     finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

//     //    this.setState({
//     //        expanded : !this.state.expanded
//     //    });

//     //    this.state.animation.setValue(initialValue);
//     //    Animated.spring(
//     //        this.state.animation,
//     //        {
//     //            toValue: finalValue
//     //        }
//     //    ).start();
//     }

//     const viewContentRender = () =>{
//         // let icon = 'down'
//         // if(!expanded){
//         //     icon = 'up'
//         // }

//         return (
//             <View style={styles().scrollViewContainer}>
//                 <View style={styles().card}>
//                     <View style={{flex: 1, flexDirection: 'row',padding:1,flexWrap: "wrap"}}>
//                         <View style={styles().invoice}>
//                             <Image source={images.file}   style={styles().imageStyle}  />
//                         </View>
//                         <View style={{flex:1}}>
//                             <Text style={styles().invoiceNo}>Invoice No #566</Text>
//                             <View style={{flex: 1, flexDirection: 'row',flexWrap: "wrap",marginTop:30,padding:1}}>
//                                 <View style={{flex:1}}>
//                                     <Text>
//                                         <Icon
//                                             name='file-check'
//                                             size={checkMarkSize}
//                                             color={"#c0c0c0"}
//                                         />
//                                         2021
//                                     </Text>
//                                 </View>
//                                     <View style={{flex:1}}>
//                                     <Text>
//                                             <Icon
//                                                 name='file-word'
//                                                 size={checkMarkSize}
//                                                 color={"#c0c0c0"}
//                                             />
//                                             <Text style={{color:colors.primary}}>2021</Text>SAR
//                                         </Text>
//                                     </View>
//                                     <View style={{flex:1}}>
//                                         <Text>
//                                             <Icon
//                                                 name='calendar'
//                                                 size={checkMarkSize}
//                                                 color={"#c0c0c0"}
//                                             />
//                                             2021/02/23
//                                         </Text>
//                                     </View>
//                                 <View>
//                                    <TouchableOpacity onPress={toggleExpanded}>
//                                         <Icon style={{marginTop:7}}
//                                             name='chevron-double-down'
//                                             size={checkMarkSize}
//                                             color={"#c0c0c0"}
//                                         />
//                                    </TouchableOpacity>
//                                 </View>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </View>

//         );
//     }
//     const viewRender = () =>{
//         // let icon = 'chevron-double-down';
//         // if(!expanded){
//         //     icon = 'file-check';
//         // }
//         // setExpanded(!expanded);

//         return (
//             <View style={styles().innerContainer}>
//                     <View style={styles().innerCard}>
//                     <View>
//                         <Image source={images.udhLogo}   style={styles().imageS}  />
//                     </View>
//                     <Text style={styles().headerTitle}>{i18n.t('homeTabTranslations.header')}</Text>
//                     <Text style={styles().invoiceSummary}>{i18n.t('invoiceTabTranslations.invoiceSummary')}</Text>
//                     <View style={{flex: 1, flexDirection: 'row',flexWrap: "wrap"}}>
//                         <View style={{flex:1}}>
//                             <Text style={[styles().invoiceSummaryDetail,styles().paddingLeft]}>{i18n.t('invoiceTabTranslations.invoiceNo')}</Text>
//                         </View>
//                         <View style={{flex:1}}>
//                             <Text style={styles().invoiceSummaryDetail}>{i18n.t('invoiceTabTranslations.invoiceDate')}</Text>
//                         </View>
//                         <View style={{flex:1}}>
//                             <Text style={styles().invoiceSummaryDetail}>{i18n.t('invoiceTabTranslations.doctorName')}</Text>
//                         </View>
//                     </View>

//                     <View style={styles().flexWrap}>
//                         <View style={{flex:1}}>
//                             <Text style={styles().invoiceSummaryDetailText}>8967564</Text>
//                         </View>
//                         <View style={{flex:1}}>
//                             <Text style={styles().invoiceSummaryDetailText}>Mar 13.2021</Text>
//                         </View>
//                         <View style={{flex:1}}>
//                             <Text style={styles().invoiceSummaryDetailText}>Dr. Eman Ali</Text>
//                         </View>

//                     </View>

//                     <View style={styles().flexWrap}>
//                         <View style={{flex:1}}>
//                             <Text style={[styles().invoiceSummaryDetail,styles().paddingLeft]}>{i18n.t('invoiceTabTranslations.Patient')}</Text>
//                         </View>
//                         <View style={{flex:1}}>
//                             <Text style={styles().invoiceSummaryDetail}>{i18n.t('invoiceTabTranslations.ProfileNo')}</Text>
//                         </View>
//                         <View style={{flex:1}}>
//                             <Text style={styles().invoiceSummaryDetail}>{i18n.t('invoiceTabTranslations.idNo')}</Text>
//                         </View>
//                     </View>

//                     <View style={styles().flexWrap}>
//                         <View style={{flex:1}}>
//                             <Text style={styles().invoiceSummaryDetailText}>Ali</Text>
//                         </View>
//                         <View style={{flex:1}}>
//                             <Text style={styles().invoiceSummaryDetailText}>200</Text>
//                         </View>
//                         <View style={{flex:1}}>
//                             <Text style={styles().invoiceSummaryDetailText}>1**566</Text>
//                         </View>
//                     </View>

//                     <View style={styles().flexWrap}>
//                         <View style={{flex:1}}>
//                             <Text style={[styles().invoiceSummaryDetail,styles().paddingLeft]}>{i18n.t('invoiceTabTranslations.Patient')}</Text>
//                         </View>
//                         <View style={{flex:1}}>
//                             <Text style={styles().invoiceSummaryDetailText}>8967</Text>
//                         </View>
//                     </View>
//                     <View style={styles().flexWrap}>
//                         <View style={{flex:1}}>
//                             <Text style={[styles().invoiceSummaryDetail,styles().paddingLeft]}>{i18n.t('invoiceTabTranslations.vat')}</Text>
//                         </View>
//                         <View style={{flex:1}}>
//                             <Text style={styles().invoiceSummaryDetailText}>8967</Text>
//                         </View>
//                     </View>
//                     <View style={styles().flexWrap}>
//                         <View style={{flex:1}}>
//                             <Text style={[styles().invoiceSummaryDetail,styles().paddingLeft]}>{i18n.t('invoiceTabTranslations.total')}</Text>
//                         </View>
//                         <View style={{flex:1}}>
//                             <Text style={styles().invoiceSummaryDetailText}>67.00</Text>
//                         </View>
//                     </View>
//                     <View style={styles().flexWrap}>
//                         <View style={{flex:1}}>
//                             <Text style={[styles().invoiceSummaryDetail,styles().paddingLeft]}>{i18n.t('invoiceTabTranslations.paidAmount')}</Text>
//                         </View>
//                         <View style={{flex:1}}>
//                             <Text style={styles().invoiceSummaryDetailText}>8967.00</Text>
//                         </View>
//                     </View>
//                     <View style={styles().flexWrap}>
//                         <View style={{flex:1}}>
//                             <Text style={[styles().invoiceSummaryDetail,styles().paddingLeft,styles().amountColor]}>{i18n.t('invoiceTabTranslations.amountDue')}</Text>
//                         </View>
//                         <View style={{flex:1}}>
//                             <Text style={[styles().invoiceSummaryDetailText,styles().amountColor]}>34.00</Text>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         );
//     }

//     const setSections = (sections) => {
//         //setting up a active section state
//         setActiveSections(sections.includes(undefined) ? [] : sections);
//     };
//     const renderHeader = (section, _, isActive) => {
//         //Accordion Header view
//         return (
//         <Animatable.View
//             duration={300}
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
//             duration={300}
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

//     // end

//     return (
//         <LoadingWrapper
//             navigation={navigation}
//             header={header}
//             headerText={i18n.t('invoiceTabTranslations.invoices')}
//             >

//                 <View style={{flex: 1}}>

//                 <SafeAreaView style={{ flex: 1 }}>
//                     <View style={styles().container}>
//                         <ScrollView>

//                         {/*Code for Accordion/Expandable List starts here*/}
//                         <Accordion
//                             activeSections={activeSections}
//                             //for any default active section
//                             sections={CONTENT}
//                             //title and content of accordion
//                             touchableComponent={TouchableOpacity}

//                             expandMultiple={multipleSelect}
//                             renderHeader={renderHeader}
//                             renderContent={renderContent}
//                             duration={300}
//                             onChange={setSections}
//                         />
//                         </ScrollView>
//                     </View>
//                     </SafeAreaView>
//                 </View>

//         </LoadingWrapper>
//     )
// }

// export default connect(null, { getAllSpecialities })(PaidInvoice);
