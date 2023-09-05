// import React, {useState, useRef, useEffect} from 'react';
// import {
//   View,
//   StyleSheet,
//   Image,
//   FlatList,
//   Alert,
//   I18nManager,
//   TouchableOpacity,
// } from 'react-native';
// import {LoadingWrapper} from '../../../../components';
// import {
//   colors,
//   images,
//   routesNames,
//   i18n,
//   fontFamilies,
//   WP,
//   mobileNumber,
//   setPhoneNumber,
// } from '../../../../services/index';
// import PrimaryButton from '../../../../components/buttons/PrimaryButton';
// import {Text} from '../../../../components';
// import InputWithLabel from '../../../../components/inputs/InputWithLabel';
// import Modal from 'react-native-modal';
// import Feather from 'react-native-vector-icons/Feather';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
// import AsyncStorage from '@react-native-community/async-storage';
// import Toast from 'react-native-simple-toast';
// import {color} from 'react-native-reanimated';

// const checkMarkSize = 50;
// const PrivateCareService = ({navigation}) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   // const [loading, setLoading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [foneNo, onPromoNoChange] = useState('');

//   // const [modalVisible, setModalVisible] = useState(false);

//   const onHide = useRef();
//   const click = () => {
//     // navigation.replace({ screen: routesNames.cardSelection });
//     navigation.navigate(routesNames.cardSelection);
//   };

//   return (
//     <LoadingWrapper
//       navigation={navigation}
//       loading={loading}
//       header
//       lightGreyBG={true}>
//       <View style={styles().ReportFormWrapper}>
//         <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
//           <View style={styles().scrollViewContainer}>
//             <View>
//               <Text style={styles().titleStyle}>
//                 {i18n.t('paymentTranslations.paymentTitle')}
//               </Text>
//             </View>
//             <View style={styles().cardContainer}>
//               <View style={styles().container}>
//                 <View style={styles().buttonContainer}>
//                   <Text style={styles().titleService}>
//                     <Image
//                       source={images.phoneHandle}
//                       style={styles().phoneImage}
//                       resizeMode="contain"
//                     />
//                     &nbsp;&nbsp;{i18n.t('paymentTranslations.servicePrice')}
//                   </Text>
//                 </View>
//                 <View style={styles().buttonContainer}>
//                   <Text style={styles().visitTitleStyle}>SAR 45/visit</Text>
//                 </View>
//               </View>
//               <View>
//                 <Text style={styles().taxText}>
//                   {i18n.t('paymentTranslations.taxInclude')}
//                 </Text>
//               </View>

//               <View>
//                 <TouchableOpacity onPress={() => setModalVisible(true)}>
//                   <Text style={styles().promoText}>
//                     {i18n.t('paymentTranslations.addPromoCode')}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <View style={styles().creditCard}>
//               <View
//                 style={{
//                   flex: 1,
//                   flexDirection: 'row',
//                   padding: 1,
//                   flexWrap: 'wrap',
//                 }}>
//                 <View style={styles().creditcardcheck}>
//                   <Icon
//                     style={styles().creditcardcheckContainer}
//                     name="credit-card-check"
//                     size={checkMarkSize}
//                     color={colors.white}
//                   />
//                 </View>
//                 <View style={styles().creditContainer}>
//                   <Image
//                     source={images.googlePay1}
//                     style={styles().googleImage}
//                     resizeMode="contain"
//                   />
//                 </View>
//                 <View style={styles().creditContainer}>
//                   <Image
//                     source={images.apple}
//                     style={styles().googleImage}
//                     resizeMode="contain"
//                   />
//                 </View>
//               </View>

//               <View
//                 style={{
//                   flex: 1,
//                   flexDirection: 'row',
//                   padding: 1,
//                   flexWrap: 'wrap',
//                 }}>
//                 <View style={styles().buttonContainer}>
//                   <TouchableOpacity onPress={click}>
//                     <Text style={styles().titleStyleCard}>
//                       {i18n.t('paymentTranslations.creditCard')}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View style={styles().buttonContainer}>
//                   <Text style={styles().titleStyleCard}>
//                     {i18n.t('paymentTranslations.googlePay')}
//                   </Text>
//                 </View>
//                 <View style={styles().buttonContainer}>
//                   <Text style={styles().titleStyleCard}>
//                     {i18n.t('paymentTranslations.applePay')}
//                   </Text>
//                 </View>
//               </View>

//               <View
//                 style={{
//                   flex: 1,
//                   flexDirection: 'row',
//                   padding: 1,
//                   flexWrap: 'wrap',
//                   marginTop: 30,
//                 }}>
//                 <View style={styles().buttonContainer}>
//                   <View
//                     style={{
//                       flex: 1,
//                       flexDirection: 'row',
//                       padding: 1,
//                       flexWrap: 'wrap',
//                     }}>
//                     <View>
//                       <Image
//                         source={images.mastercard}
//                         style={styles().imageStyle}
//                       />
//                     </View>
//                     <View>
//                       <Text
//                         style={{
//                           fontFamily: fontFamilies('boldText'),
//                           fontSize: 12,
//                         }}>
//                         XXXX - XXXX - XXXX - 9078
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//                 <View>
//                   <Text style={styles().changeText}>Change</Text>
//                 </View>
//               </View>
//             </View>
//             <View style={{height: 50}} />
//             <PrimaryButton>
//               {i18n.t('paymentTranslations.payAndSendRequest')}
//               {submitIcon()}
//             </PrimaryButton>
//             <View style={{height: 50}} />
//           </View>
//         </KeyboardAvoidingScrollView>
//       </View>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert('Modal has been closed.');
//           setModalVisible(!modalVisible);
//         }}>
//         <View style={styles().centeredView}>
//           <View style={styles().modalView}>
//             <Text style={styles().promotitleStyle}>
//               {i18n.t('bookAppointmentTranslations.enterCode')}
//             </Text>

//             <InputWithLabel
//               maxLength={13}
//               value={foneNo}
//               onChange={onPromoNoChange}
//               containerStyle={styles().phoneNoStyle}></InputWithLabel>

//             <View style={styles().container}>
//               <View style={{flex: 1, height: 40}}>
//                 <TouchableOpacity
//                   style={styles().btncancel}
//                   onPress={() => setModalVisible(!modalVisible)}>
//                   <Text style={styles().textStyleCancel}>
//                     {i18n.t('bookAppointmentTranslations.cancel')}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={{flex: 1, height: 40}}>
//                 <TouchableOpacity
//                   style={[styles().button, styles().buttonClose]}
//                   onPress={() => setModalVisible(!modalVisible)}>
//                   <Text style={styles().textStyle}>
//                     {i18n.t('bookAppointmentTranslations.apply')}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//             <View style={{height: 20}} />
//           </View>
//         </View>
//       </Modal>
//     </LoadingWrapper>
//   );
// };

// const submitIcon = () => {
//   console.log('submit');
// };

// export default PrivateCareService;

// const styles = () =>
//   StyleSheet.create({
//     ReportFormWrapper: {
//       flex: 1,
//     },
//     imageStyle: {
//       // alignSelf: 'center',
//       height: 50,
//       width: 50,
//       marginTop: -15,
//     },
//     googleImage: {
//       // alignSelf: 'center',
//       height: 50,
//       width: 50,
//       marginTop: 12,
//       alignSelf: 'center',
//     },
//     phoneImage: {
//       height: 30,
//       width: 30,
//       // marginTop:12,
//       alignSelf: 'center',
//       // margin:10
//     },

//     titleStyle: {
//       color: colors.black,
//       fontSize: 23,
//       textAlign: 'left',
//       fontFamily: fontFamilies('boldText'),
//       marginTop: 30,
//       marginBottom: 30,
//     },
//     promotitleStyle: {
//       color: colors.black,
//       fontSize: 20,
//       textAlign: 'left',
//       fontFamily: fontFamilies('boldText'),
//     },
//     titleService: {
//       color: colors.black,
//       fontSize: 14,
//       textAlign: 'left',
//       // fontFamily: fontFamilies('boldText'),
//       marginTop: 10,
//       height: 50,
//     },
//     titleStyleCard: {
//       color: colors.black,
//       fontSize: 13,
//       textAlign: 'left',
//       textAlign: 'center',
//       // fontFamily: fontFamilies('boldText'),
//     },
//     visitTitleStyle: {
//       color: colors.black,
//       fontSize: 17,
//       textAlign: 'left',
//       fontFamily: fontFamilies('boldText'),
//       marginTop: 20,
//       textAlign: 'right',
//     },
//     taxText: {
//       color: colors.grey,
//       marginVertical: 5,
//       fontSize: 13,
//       textAlign: 'right',
//     },
//     promoText: {
//       color: colors.primary,
//       marginVertical: 5,
//       fontSize: 14,
//       textAlign: 'right',
//       fontWeight: 'bold',
//     },
//     changeText: {
//       color: colors.skyBlueDark,
//       // marginVertical: 5,
//       fontSize: 14,
//       textAlign: 'right',
//       fontWeight: 'bold',
//       marginRight: 20,
//     },

//     bottomModal: {
//       justifyContent: 'flex-end',
//       margin: 0,
//     },
//     scrollViewContainer: {
//       width: WP('92'),
//       alignSelf: 'center',
//     },

//     cardContainer: {
//       padding: 10,
//       backgroundColor: '#FFFFFF',
//       borderRadius: 10,
//       marginTop: 10,
//       marginHorizontal: 5,
//       shadowColor: 'rgba(0,0,0, .4)',
//       shadowOffset: {height: 1, width: 1},
//       shadowOpacity: 1,
//       shadowRadius: 1,
//       elevation: 5,
//     },
//     creditCard: {
//       padding: 10,
//       backgroundColor: '#FFFFFF',
//       borderRadius: 10,
//       marginTop: 2,
//       marginHorizontal: 5,
//       shadowColor: 'rgba(0,0,0, .4)',
//       shadowOffset: {height: 1, width: 1},
//       shadowOpacity: 1,
//       shadowRadius: 1,
//       elevation: 5,
//     },
//     container: {
//       flex: 1,
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     buttonContainer: {
//       flex: 1,
//     },
//     creditContainer: {
//       flex: 1,
//       borderColor: '#dddddd',
//       borderWidth: 1,
//       // marginBottom: 30,
//       borderRadius: 20,
//       margin: 3,
//     },
//     iconStyle: {
//       textAlign: 'center',
//       margin: 10,
//     },

//     creditcardcheck: {
//       flex: 1,
//       borderColor: colors.primary,
//       // borderWidth: 1,
//       // marginBottom: 30,
//       borderRadius: 20,
//       margin: 3,
//       backgroundColor: colors.primary,
//     },
//     creditcardcheckContainer: {
//       flex: 1,
//       borderColor: '#dddddd',
//       // borderWidth: 1,
//       marginBottom: 30,
//       borderRadius: 20,
//       margin: 3,
//       textAlign: 'center',
//       margin: 10,
//     },
//     phoneNoStyle: {
//       // marginTop: 30,
//       marginBottom: 30,
//     },
//     // modal style

//     centeredView: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginTop: 22,
//     },
//     modalView: {
//       width: '100%',

//       margin: 20,
//       backgroundColor: 'white',
//       borderRadius: 20,
//       padding: 35,
//       alignItems: 'center',
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.25,
//       shadowRadius: 4,
//       elevation: 5,
//     },
//     button: {
//       borderRadius: 5,
//       padding: 10,
//       elevation: 2,
//       marginTop: 7,
//     },
//     btncancel: {
//       borderRadius: 5,
//       padding: 10,
//       elevation: 2,
//       color: colors.black,
//       margin: 4,
//     },
//     buttonOpen: {
//       backgroundColor: '#F194FF',
//     },
//     buttonClose: {
//       backgroundColor: colors.primary,
//     },
//     textStyle: {
//       color: 'white',
//       fontWeight: 'bold',
//       textAlign: 'center',
//     },
//     textStyleCancel: {
//       color: colors.black,
//       fontWeight: 'bold',
//       textAlign: 'center',
//     },
//     modalText: {
//       marginBottom: 15,
//       textAlign: 'center',
//     },
//   });
