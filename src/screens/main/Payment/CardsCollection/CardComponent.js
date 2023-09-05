// import React from 'react';
// import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {LoadingWrapper} from '../../../../components';

// import {
//   colors,
//   images,
//   shadows,
//   renderCardNumber,
//   fontFamilies,
// } from '../../../../services';

// const Card = ({cardType, cardNumber, selected, onPress}) => {
//   return (
//     <LoadingWrapper>
//       <TouchableOpacity
//         activeOpacity={0.5}
//         style={styles.conatiner}
//         onPress={onPress}>
//         <View style={styles.row}>
//           {selected ? (
//             <View style={styles.selectBoxSelected}>
//               <Icon name="check" size={18} color={colors.whiteAbsolute} />
//             </View>
//           ) : (
//             <View style={styles.selectBox}></View>
//           )}
//           {cardType === 'Master Card' ? (
//             <Image source={images.mastercard} style={styles.cardImage} />
//           ) : (
//             <Image source={images.visa} style={styles.cardImage} />
//           )}

//           <View style={styles.cardDetails}>
//             <Text style={styles.cardName}>Master Card</Text>
//             <Text style={styles.cardNumber}>
//               {renderCardNumber(cardNumber)}
//             </Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </LoadingWrapper>
//   );
// };

// export default Card;

// const styles = StyleSheet.create({
//   conatiner: {
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     ...shadows.lightShadowGrey,
//     marginVertical: 10,
//     backgroundColor: colors.white,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   selectBox: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: colors.grey,
//     marginLeft: 10,
//   },
//   selectBoxSelected: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: colors.green,
//     marginLeft: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cardImage: {
//     width: 40,
//     height: 40,
//     resizeMode: 'contain',
//     marginLeft: 30,
//   },
//   cardDetails: {
//     marginLeft: 20,
//   },
//   cardName: {
//     fontFamily: fontFamilies('boldText'),
//     color: colors.black,
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   cardNumber: {
//     color: colors.darkGrey,
//   },
// });
