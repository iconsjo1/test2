// import React, {useEffect, useState} from 'react';
// import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import Icon from 'react-native-vector-icons/FontAwesome';

// import styles from './styles';
// import AuthHeader from '../../../../components/headers/CustomHeader/AuthHeader';
// import {
//   colors,
//   HP,
//   images,
//   routesNames,
//   i18n,
//   renderCardNumber,
// } from '../../../../services';
// import CardComponent from '../CardComponent';
// import Button from '../../../../components/buttons/IosStyleButton';
// import {getAllCards} from '../../../../store/actions/main/cardsActions';
// import {bindActionCreators} from 'redux';
// import {cardsReducerTypes} from '../../../../services/constants/types';

// const paymentMethods = [
//   {
//     name: 'Credit Card',
//     imageWhite: images.credit,
//     imageDark: images.creditDark,
//   },
//   {
//     name: 'Google Pay',
//     imageWhite: images.googlePayWhite,
//     imageDark: images.googlePayDark,
//   },
//   {
//     name: 'Apple Pay',
//     imageWhite: images.applePayWhite,
//     imageDark: images.applePayDark,
//   },
// ];

// const SelectPaymentType = ({route, navigation}) => {
//   const {invoice, card} = route.params;
//   const dispatch = useDispatch();

//   const cards = useSelector((state) => state.cards);

//   const [checked, setChecked] = useState(0);

//   useEffect(() => {
//     const fetchedCards = dispatch({type: cardsReducerTypes.GET_ALL_CARDS});
//     console.log(fetchedCards);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <AuthHeader navigation={navigation} />
//       <View style={styles.header}>
//         <Text style={styles.headerText}>
//           {i18n.t('selectPaymentTypeTranslations.payment')}
//         </Text>
//       </View>
//       {/* Todo use SVG to get the same shape as the design */}
//       <View style={styles.card}>
//         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//           <View style={styles.svgCard}>
//             <CardComponent />
//           </View>
//         </View>
//         <View style={styles.cardHeader}>
//           <View style={styles.servicePrice}>
//             <View style={styles.row}>
//               <Image
//                 source={images.phoneIcon}
//                 style={styles.servicePriceImage}
//               />
//               <Text style={styles.servicePriceText}>
//                 {i18n.t('selectPaymentTypeTranslations.servicePrice')}
//               </Text>
//             </View>
//             <Text style={{...styles.servicePriceText, fontWeight: 'bold'}}>
//               {invoice.price}
//               {i18n.t('selectPaymentTypeTranslations.sar')}{' '}
//               {i18n.t('selectPaymentTypeTranslations.visit')}
//             </Text>
//           </View>
//           <Text style={styles.hint}>
//             {i18n.t('selectPaymentTypeTranslations.tax')}
//           </Text>
//         </View>
//       </View>
//       <View style={styles.paymentSelections}>
//         <View style={{...styles.row, justifyContent: 'space-between'}}>
//           {paymentMethods.map((payment, i) =>
//             checked === i ? (
//               <View key={payment.name} style={{alignItems: 'center'}}>
//                 <TouchableOpacity
//                   activeOpacity={0.8}
//                   style={styles.paymentMethodSelected}>
//                   <Image
//                     source={payment.imageWhite}
//                     style={styles.paymentMethodImage}
//                   />
//                 </TouchableOpacity>
//                 <Text style={styles.iconTextSelected}>{payment.name}</Text>
//               </View>
//             ) : (
//               <View key={payment.name} style={{alignItems: 'center'}}>
//                 <TouchableOpacity
//                   activeOpacity={0.8}
//                   key={payment.name}
//                   style={styles.paymentMethod}
//                   onPress={() => setChecked(i)}>
//                   <Image
//                     source={payment.imageDark}
//                     style={styles.paymentMethodImage}
//                   />
//                 </TouchableOpacity>
//                 <Text style={styles.iconText}>{payment.name}</Text>
//               </View>
//             ),
//           )}
//         </View>
//         {checked === 0 ? (
//           <View style={{marginTop: 40}}>
//             <View style={{...styles.row, justifyContent: 'space-between'}}>
//               {cards.length > 0 ? (
//                 <>
//                   {card ? (
//                     <>
//                       <Image
//                         source={images.mastercard}
//                         style={{width: 40, height: 30, resizeMode: 'contain'}}
//                       />
//                       <Text style={styles.creditText}>
//                         {card ? renderCardNumber(card.cardNo) : ''}
//                       </Text>
//                       <Button
//                         children={i18n.t(
//                           'selectPaymentTypeTranslations.changeCard',
//                         )}
//                         onPress={() =>
//                           navigation.navigate(routesNames.cardsCollection, {
//                             invoice: invoice,
//                           })
//                         }
//                       />
//                     </>
//                   ) : (
//                     <Button
//                       children={i18n.t(
//                         'selectPaymentTypeTranslations.selectCard',
//                       )}
//                       onPress={() =>
//                         navigation.navigate(routesNames.cardsCollection, {
//                           invoice: invoice,
//                         })
//                       }
//                     />
//                   )}
//                 </>
//               ) : (
//                 <Button
//                   children={i18n.t('selectPaymentTypeTranslations.addCard')}
//                   onPress={() =>
//                     navigation.navigate(routesNames.cardsCollection, {
//                       invoice: invoice,
//                     })
//                   }
//                 />
//               )}
//             </View>
//           </View>
//         ) : null}
//       </View>
//       <View style={{marginTop: checked === 0 ? 40 : HP(13.00002)}}>
//         {checked === 0 ? (
//           card ? (
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate(routesNames.successfulPayment, {
//                   invoiceDetails: invoice.summary,
//                 })
//               }
//               activeOpacity={0.9}
//               style={styles.primaryButtonWithIcon}>
//               <Icon name="lock" size={24} color={colors.whiteAbsolute} />
//               <Text style={styles.btnText}>
//                 {i18n.t('selectPaymentTypeTranslations.payBtn')}
//               </Text>
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity
//               disabled={true}
//               onPress={() =>
//                 navigation.navigate(routesNames.successfulPayment, {
//                   invoiceDetails: invoice.summary,
//                 })
//               }
//               activeOpacity={0.9}
//               style={{
//                 ...styles.primaryButtonWithIcon,
//                 backgroundColor: colors.grey,
//               }}>
//               <Icon name="lock" size={24} color={colors.whiteAbsolute} />
//               <Text style={styles.btnText}>
//                 {i18n.t('selectPaymentTypeTranslations.payBtnDisable')}
//               </Text>
//             </TouchableOpacity>
//           )
//         ) : (
//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate(routesNames.successfulPayment, {
//                 invoiceDetails: invoice.summary,
//               })
//             }
//             activeOpacity={0.9}
//             style={styles.primaryButtonWithIcon}>
//             <Icon name="lock" size={24} color={colors.whiteAbsolute} />
//             <Text style={styles.btnText}>
//               {i18n.t('selectPaymentTypeTranslations.payBtn')}
//             </Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// export default SelectPaymentType;
