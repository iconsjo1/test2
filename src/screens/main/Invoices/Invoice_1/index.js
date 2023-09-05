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
// import Item from './Item';
// import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
// import AsyncStorage from '@react-native-community/async-storage';
// import Toast from 'react-native-simple-toast';

// const Invice_1 = ({navigation}) => {
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [invoiceNo, setInvoiceNo] = useState('');
//   const [foneNo, onFoneNoChange] = useState('');
//   const onHide = useRef();

//   const onchangeInvoice = () => {
//     console.log();
//     // setModalVisible();
//   };

//   // const showModal = () => {
//   // }

//   const click = () => {
//     // navigation.replace({ screen: routesNames.cardSelection });
//     // let parent = navigation;
//     // navigation.replace(routesNames.aboutUs);
//     // parent?.goBack();
//     navigation.navigate(routesNames.invoice_2);
//   };

//   const clickPrivate = () => {
//     navigation.navigate(routesNames.PrivateCareService);
//   };

//   useEffect(() => {
//     setPhoneNumber(onFoneNoChange);
//     setPhoneNumber(setInvoiceNo);
//   }, []);

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
//               <Image source={images.invoice_1} style={styles().imageStyle} />
//             </View>
//             <View>
//               <Text style={styles().titleStyle}>
//                 {i18n.t('reportsTabTranslations.insert')}
//               </Text>
//             </View>
//             <TouchableOpacity onPress={click}>
//               <Text>Invoice 2 screen</Text>
//             </TouchableOpacity>

//             <TouchableOpacity onPress={clickPrivate}>
//               <Text>45_Private Care Screen</Text>
//             </TouchableOpacity>

//             <InputWithLabel
//               maxLength={13}
//               keyboardType="phone-pad"
//               value={foneNo}
//               placeholder={i18n.t(
//                 'reportsTabTranslations.mrnNumberPlaceholder',
//               )}
//               onChange={onFoneNoChange}
//               containerStyle={styles().phoneNoStyle}>
//               {i18n.t('reportsTabTranslations.mrnNumber')}
//             </InputWithLabel>

//             <InputWithLabel
//               maxLength={13}
//               keyboardType="phone-pad"
//               value={invoiceNo}
//               placeholder={i18n.t(
//                 'reportsTabTranslations.invoiceNumberPlaceholder',
//               )}
//               onChange={setInvoiceNo}
//               containerStyle={styles().phoneNoStyle}>
//               {i18n.t('reportsTabTranslations.invoiceNumberPlaceholder')}
//             </InputWithLabel>

//             <PrimaryButton>
//               {i18n.t('reportsTabTranslations.submit')}
//               {submitIcon()}
//             </PrimaryButton>
//             <View style={{height: 50}} />
//           </View>
//         </KeyboardAvoidingScrollView>
//       </View>
//     </LoadingWrapper>
//   );
// };

// const submitIcon = () => {
//   console.log('submit');
// };

// export default Invice_1;

// const styles = () =>
//   StyleSheet.create({
//     ReportFormWrapper: {
//       flex: 1,
//     },
//     imageStyle: {
//       alignSelf: 'center',
//     },
//     modalContenHeaderStyle: {
//       height: 6,
//       width: 48,
//       backgroundColor: '#E0E0E0',
//       alignSelf: 'center',
//       borderRadius: 15,
//     },
//     titleStyle: {
//       color: colors.black,
//       fontSize: 17,
//       textAlign: 'left',
//       fontFamily: fontFamilies('boldText'),
//       marginTop: 30,
//     },
//     fileNoStyle: {
//       marginTop: 30,
//     },
//     phoneNoStyle: {
//       marginTop: 20,
//       marginBottom: 10,
//     },
//     forgetText: {
//       color: colors.link,
//       marginVertical: 5,
//       fontSize: 13,
//       textAlign: 'left',
//     },
//     selectTextStyle: {
//       color: '#EB8C43',
//       fontSize: 16,
//       marginBottom: 25,
//       marginTop: 25,
//     },
//     modalContent: {
//       backgroundColor: colors.white,
//       paddingVertical: 25,
//       justifyContent: 'flex-start',
//       alignItems: 'flex-start',
//       paddingHorizontal: 30,
//       borderTopLeftRadius: 18,
//       borderTopRightRadius: 18,
//     },
//     bottomModal: {
//       justifyContent: 'flex-end',
//       margin: 0,
//     },
//     scrollViewContainer: {
//       width: WP('92'),
//       alignSelf: 'center',
//     },
//   });
