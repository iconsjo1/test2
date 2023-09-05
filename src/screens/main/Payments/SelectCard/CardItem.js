// import React from 'react'
// import ShadowView from 'react-native-simple-shadow-view';
// import { shadows, colors, images, renderCardNumber } from '../../../../services';
// import styles from './styles';
// import { View, Image } from 'react-native';
// import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Text, TouchableOpacity } from '../../../../components';

// const CardItem = ({ type, cardNumber, selected, onPress }) => {
//     return (
//         <ShadowView style={[shadows.lightShadowGrey, styles().shadowWrapper]}>
//             <TouchableOpacity onPress={onPress} style={styles().touchContainer}>
//                 {selected ?
//                     <Icons name="checkbox-marked-circle" color={colors.green} size={30} />
//                     :
//                     <Icons name="checkbox-blank-circle-outline" color={colors.green} size={30} />
//                 }
//                 <View style={styles().image}>
//                     <Image source={rednerCardImage(type)} style={styles().image} resizeMode='contain' />
//                 </View>
//                 <View style={styles().detailsContainer}>
//                     <Text style={{ textAlign: 'left' }}>
//                         {type.replace('-', ' ')}
//                     </Text>
//                     <Text style={{ textAlign: 'left' }}>
//                         {renderCardNumber(cardNumber)}
//                     </Text>
//                 </View>
//             </TouchableOpacity>
//         </ShadowView>
//     )
// }

// export default CardItem;

// const rednerCardImage = type => {
//     switch (type) {
//         case "MASTER-CARD":
//             return images.mastercard;
//         case "VISA-MASTER":
//             return images.visa;
//         case "AMERICAN-EXPRESS":
//             return images.amex;
//     }
// }
