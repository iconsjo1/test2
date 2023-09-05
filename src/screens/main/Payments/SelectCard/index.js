// import React, { useEffect, useState } from 'react'
// import { ScrollView, View, Image } from 'react-native';
// import { LoadingWrapper, Text, SuccessButton, SuccessButtonDark } from '../../../../components';
// import styles from "./styles";
// import { connect, useSelector, useDispatch } from 'react-redux';
// import { getAllCards } from '../../../../store/actions';
// import CardItem from './CardItem';
// import { images, WP, paymentsReducersTypes, i18n, routesNames } from '../../../../services';

// const SelectCard = ({ navigation, getAllCards }) => {
//     const cards = useSelector(state => state.payment.allCards);
//     const [loading, setLoading] = useState(Boolean(!cards));
//     const [success, setSuccess] = useState(false);
//     const [failure, setFailure] = useState(false);
//     const selectedCard = useSelector(state => state.payment.selectedCard);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const cbSucsess = () => {
//             setLoading(false);
//             setSuccess(true);
//         }
//         const cbFailure = () => {
//             setLoading(false);
//             setFailure(true);
//         }
//         if (!cards) getAllCards(cbSucsess, cbFailure);
//     }, []);

//     return (
//         <LoadingWrapper
//             header
//             loading={loading}
//             navigation={navigation}>
//             <ScrollView
//                 showsVerticalScrollIndicator={false}>
//                 <View style={styles().container}>
//                     <Text style={styles().header}>
//                         {i18n.t('selectCardsTranslations.card')}
//                     </Text>
//                     {cards ?
//                         cards.length !== 0 ?
//                             cards.map((el, i) => (
//                                 <CardItem
//                                     onPress={() => dispatch({
//                                         type: paymentsReducersTypes.SET_SELECTED_CARD,
//                                         payload: i
//                                     })}
//                                     selected={i === selectedCard}
//                                     {...el}
//                                     key={i} />
//                             ))
//                             :
//                             <>
//                                 <Image style={styles().nocards} resizeMode='contain' source={images.noCards} />
//                                 <Text style={styles().nocardsText}>
//                                     {i18n.t('selectCardsTranslations.noCard')}
//                                 </Text>
//                             </>
//                         : null}
//                     <SuccessButtonDark onPress={() => navigation.navigate(routesNames.addCard)} buttonStyle={{ marginVertical: 40 }}>
//                         {i18n.t('selectCardsTranslations.addCard')}
//                     </SuccessButtonDark>
//                 </View>
//             </ScrollView>
//         </LoadingWrapper>
//     )
// }

// export default connect(null, { getAllCards })(SelectCard);
