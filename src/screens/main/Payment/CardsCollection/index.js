// import React, {useEffect, useState} from 'react';
// import {View, Text, Button, TouchableOpacity} from 'react-native';
// import {useSelector} from 'react-redux';
// import Icon from 'react-native-vector-icons/Ionicons';

// import Card from './CardComponent';
// import styles from './styles';
// import AuthHeader from '../../../../components/headers/CustomHeader/AuthHeader';
// import {colors, routesNames} from '../../../../services';
// import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
// import {LoadingWrapper} from '../../../../components';
// import {useDispatch} from 'react-redux';
// import {getAllCards} from '../../../../store/actions/main/cardsActions';

// const CardsCollection = ({route, navigation}) => {
//   const {invoice} = route.params;

//   const dispatch = useDispatch();
//   const [selectedCard, setSelectedCard] = useState();

//   const cards = useSelector((state) => state.cards);

//   useEffect(() => {
//     console.log(dispatch(getAllCards));
//   }, []);

//   return (
//     <LoadingWrapper>
//       <KeyboardAvoidingScrollView style={styles.container}>
//         <View style={styles.row}>
//           <AuthHeader navigation={navigation} />
//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate(routesNames.addNewCard, {
//                 invoiceDetails: invoice.summary,
//               })
//             }
//             style={styles.addBtnBordered}>
//             <Icon name="add" size={28} color={colors.skyBlue} />
//           </TouchableOpacity>
//         </View>
//         {cards.length > 0 ? (
//           <View style={styles.cardsContainer}>
//             {cards.map((card, index) =>
//               selectedCard === index ? (
//                 <Card
//                   cardType={card.cardType}
//                   cardNumber={card.cardNo}
//                   selected
//                   key={card.cardHolder}
//                   onPress={() => {
//                     setSelectedCard(index);
//                     setTimeout(() => {
//                       navigation.navigate(routesNames.selectPaymentType, {
//                         card: card,
//                       });
//                     }, 400);
//                   }}
//                 />
//               ) : (
//                 <Card
//                   cardType={card.cardType}
//                   cardNumber={card.cardNo}
//                   key={card.cardHolder}
//                   onPress={() => {
//                     setSelectedCard(index);
//                     setTimeout(() => {
//                       navigation.navigate(routesNames.selectPaymentType, {
//                         card: card,
//                       });
//                     }, 400);
//                   }}
//                 />
//               ),
//             )}
//           </View>
//         ) : (
//           <View
//             style={{
//               ...styles.container,
//               marginTop: 50,
//               alignItems: 'center',
//             }}>
//             <Text>There's no cards here...</Text>
//           </View>
//         )}
//         <TouchableOpacity
//           onPress={() =>
//             navigation.navigate(routesNames.addNewCard, {
//               invoiceDetails: invoice.summary,
//             })
//           }
//           style={styles.addBtn}>
//           <Text style={styles.btnText}>Add New Card</Text>
//         </TouchableOpacity>
//       </KeyboardAvoidingScrollView>
//     </LoadingWrapper>
//   );
// };

// export default CardsCollection;
