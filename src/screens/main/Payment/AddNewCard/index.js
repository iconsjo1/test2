// import React, {useState, useRef} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   Dimensions,
//   Button,
// } from 'react-native';
// import {useForm, Controller} from 'react-hook-form';
// import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
// import {useDispatch} from 'react-redux';
// import Icon from 'react-native-vector-icons/FontAwesome';

// import {LabelOnTopInput, LoadingWrapper} from '../../../../components';
// import {colors, images, i18n, routesNames} from '../../../../services';
// import styles from './styles';
// import {addNewCreditCard} from '../../../../store/actions/main/cardsActions';

// const AddNewCard = ({route, navigation}) => {
//   const {invoiceDetails} = route.params;

//   const dispatch = useDispatch();

//   const cvv2Ref = useRef();
//   const expiryInputTwoRef = useRef();

//   const focusToCvv = () => cvv2Ref.current.focus();
//   const separator = Dimensions.get('window').width > 400 ? '  ' : ' ';

//   const modifyCarNum = (num) => {
//     const numArray = num.split(separator).join('').split('');
//     if (numArray.length > 16) focusToCvv();

//     if (numArray.length > 16) {
//       numArray.splice(16, numArray.length);
//     }

//     const newArray = [];
//     for (let i = 0; i < numArray.length; i++) {
//       newArray.push(numArray[i]);
//       if ((i + 1) % 4 === 0 && i !== numArray.length - 1)
//         newArray.push(separator);
//     }
//     return newArray.join('');
//   };

//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//   } = useForm();

//   const onSumbit = (data) => {
//     const cardNumber = data.cardNumber.replace(/ /g, '');
//     const cardDetails = {
//       cardType: 'Master Card',
//       cardHolder: data.cardHolder,
//       cardNumber,
//       expiryDate: `${data.expiryDateMonth}/${data.expiryDateYear}`,
//       cvv2: data.cvv2,
//     };

//     console.log(cardDetails);

//     dispatch(addNewCreditCard(cardDetails));
//     navigation.goBack();

//     // navigation.navigate(routesNames.successfulPayment, {
//     //   invoiceDetails: invoiceDetails,
//     // });
//   };

//   return (
//     <LoadingWrapper header navigation={navigation}>
//       <KeyboardAvoidingScrollView style={styles.container}>
//         <View style={styles.header}>
//           <Image style={styles.cardImage} source={images.card} />
//         </View>
//         <View style={styles.formGroup}>
//           <View style={styles.formItem}>
//             <Controller
//               control={control}
//               name="cardHolder"
//               rules={{required: 'Card Holder is Required'}}
//               defaultValue=""
//               render={({field: {onChange, onBlur, value}}) => (
//                 <LabelOnTopInput
//                   label="Card Holder"
//                   onChangeText={(value) => onChange(value)}
//                   value={value}
//                 />
//               )}
//             />
//             {errors.cardHolder && (
//               <Text style={{color: 'red', marginVertical: 10}}>
//                 {errors.cardHolder.message}
//               </Text>
//             )}
//           </View>
//           <View style={styles.formItem}>
//             <Controller
//               control={control}
//               name="cardNumber"
//               rules={{required: 'Card Number is Required'}}
//               defaultValue=""
//               render={({field: {onChange, onBlur, value}}) => (
//                 <View style={styles.inputContainer}>
//                   <TextInput
//                     keyboardType="number-pad"
//                     style={{width: '100%', paddingHorizontal: 10, fontSize: 16}}
//                     value={value}
//                     onChangeText={(txt) => {
//                       const modifiedCardNo = modifyCarNum(txt);
//                       onChange(modifiedCardNo);
//                     }}
//                   />
//                   <Text style={styles.lable}>Card Number</Text>
//                 </View>
//               )}
//             />
//             {errors.cardNumber && (
//               <Text style={{color: 'red', marginVertical: 10}}>
//                 {errors.cardNumber.message}
//               </Text>
//             )}
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               marginTop: 10,
//             }}>
//             <View style={{flex: 1}}>
//               <View style={styles.inputContainer}>
//                 <Controller
//                   control={control}
//                   name="expiryDateMonth"
//                   rules={{required: 'Expiry Date is Required'}}
//                   defaultValue=""
//                   render={({field: {onChange, onBlur, value}}) => (
//                     <TextInput
//                       keyboardType="number-pad"
//                       maxLength={2}
//                       style={styles.input}
//                       onChangeText={(txt) => onChange(txt)}
//                       value={value}
//                     />
//                   )}
//                 />

//                 <View style={styles.diver}></View>
//                 <Controller
//                   control={control}
//                   name="expiryDateYear"
//                   rules={{required: 'Expiry Date is Required'}}
//                   defaultValue=""
//                   render={({field: {onChange, onBlur, value}}) => (
//                     <TextInput
//                       ref={expiryInputTwoRef}
//                       keyboardType="number-pad"
//                       maxLength={2}
//                       style={styles.input}
//                       onChangeText={(value) => onChange(value)}
//                       value={value}
//                     />
//                   )}
//                 />
//                 <Text style={styles.lable}>Expairy Date</Text>
//               </View>
//               {errors.expiryDateMonth && (
//                 <Text style={{color: 'red', marginVertical: 10}}>
//                   {errors.expiryDateMonth.message}
//                 </Text>
//               )}
//             </View>

//             <View style={{flex: 1}}>
//               <Controller
//                 control={control}
//                 rules={{required: 'CVV2 is Required'}}
//                 name="cvv2"
//                 defaultValue=""
//                 render={({field: {onChange, onBlur, value}}) => (
//                   <View style={{marginLeft: 10}}>
//                     <View style={styles.inputContainer}>
//                       <TextInput
//                         ref={cvv2Ref}
//                         maxLength={3}
//                         keyboardType="number-pad"
//                         style={styles.input}
//                         value={value}
//                         onChangeText={(txt) => onChange(txt)}
//                       />
//                       <Text style={styles.lable}>CVV2</Text>
//                     </View>
//                   </View>
//                 )}
//               />
//               {errors.cvv2 && (
//                 <Text
//                   style={{color: 'red', marginLeft: 15, marginVertical: 10}}>
//                   {errors.cvv2.message}
//                 </Text>
//               )}
//             </View>
//           </View>
//           <TouchableOpacity
//             activeOpacity={0.9}
//             style={styles.primaryButtonWithIcon}
//             onPress={handleSubmit(onSumbit)}>
//             <Icon name="lock" size={24} color={colors.whiteAbsolute} />
//             <Text style={styles.btnText}>
//               {i18n.t('selectPaymentTypeTranslations.payBtn')}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingScrollView>
//     </LoadingWrapper>
//   );
// };

// export default AddNewCard;
