// import React from 'react'
// import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
// import { View, Image } from 'react-native';
// import { LabelOnTopInput, CreditCardNumberInput, PrimaryButton } from '../../../../components';
// import styles from './styles';
// import { images, paymentsReducersTypes, colors, i18n } from '../../../../services';
// import { useSelector, useDispatch } from 'react-redux';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const {
//     SET_CARD_HOLDER,
//     SET_CARD_NUMBER,
//     SET_EXPIRY,
//     SET_CVV_NUMBER,
// } = paymentsReducersTypes;

// const InputForm = ({ handlePay }) => {
//     const theme = useSelector(state => state.theme.themeColor);
//     const cardHolder = useSelector(state => state.payment.cardHolder);
//     const cardNumber = useSelector(state => state.payment.cardNumber);
//     const expiry = useSelector(state => state.payment.expiry);
//     const cvv = useSelector(state => state.payment.cvv);
//     const dispatch = useDispatch();

//     return (
//         <KeyboardAvoidingScrollView>
//             <View style={styles().container}>
//                 <Image resizeMode='contain' style={styles().card} source={theme === 'light' ? images.addCard : images.addCardDrk} />
//                 <LabelOnTopInput
//                     placeholder={i18n.t('addCardTranslations.cardHolder')}
//                     value={cardHolder}
//                     onChangeText={(text) => dispatch({
//                         type: SET_CARD_HOLDER,
//                         payload: text
//                     })}
//                     label={i18n.t('addCardTranslations.cardHolder')} />
//                 <CreditCardNumberInput
//                     cardNumber={cardNumber}
//                     cardExpiry={expiry}
//                     cardCVC={cvv}
//                     setCardNumber={(text) => dispatch({
//                         type: SET_CARD_NUMBER,
//                         payload: text
//                     })}
//                     setCardExpiry={(text) => dispatch({
//                         type: SET_EXPIRY,
//                         payload: text
//                     })}
//                     setCardCVC={(text) => dispatch({
//                         type: SET_CVV_NUMBER,
//                         payload: text
//                     })} />
//                 <PrimaryButton
//                     onPress={handlePay}
//                     buttonStyle={{ marginVertical: 30 }}
//                     icon={<AntDesign name="lock" size={20} color={colors.whiteAbsolute} />}>
//                     {i18n.t('addCardTranslations.pay')}
//                 </PrimaryButton>
//             </View>
//         </KeyboardAvoidingScrollView>
//     );
// }

// export default InputForm;
