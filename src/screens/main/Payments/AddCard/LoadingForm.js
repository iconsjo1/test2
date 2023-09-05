// import React, {useState, useRef} from 'react';
// import ShadowView from 'react-native-simple-shadow-view';
// import {shadows, colors, WP, i18n} from '../../../../services';
// import styles from './styles';
// import {
//   Text,
//   IosStyleButton,
//   PrimaryButton,
//   HollowButton,
// } from '../../../../components';
// import {RippleLoader} from 'react-native-indicator';
// import {View} from 'react-native';
// import Modal from 'react-native-modal';
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

// const LoadingForm = ({navigation}) => {
//   const [modal, setModal] = useState(false);
//   const onHide = useRef();

//   return (
//     <>
//       <Text style={styles().paymentRequested}>
//         {i18n.t('addCardTranslations.requested')}
//       </Text>
//       <ShadowView style={[shadows.lightShadowGrey, styles().shadowWrapper]}>
//         <Text style={styles().requestSent}>
//           {i18n.t('addCardTranslations.reqSent')}
//         </Text>
//         <Text style={styles().requestSent}>
//           {i18n.t('addCardTranslations.wait')}
//         </Text>
//         <View style={{marginVertical: 70}}>
//           <RippleLoader size={100} strokeWidth={10} />
//         </View>
//         <IosStyleButton onPress={() => setModal(true)} underline light>
//           {i18n.t('addCardTranslations.cancelReq')}
//         </IosStyleButton>
//       </ShadowView>
//       <Modal
//         useNativeDriver
//         backdropColor={colors.modalBackDrop}
//         onModalHide={() => {
//           if (onHide.current) onHide.current();
//         }}
//         isVisible={modal}>
//         <View style={styles().modalContainer}>
//           <Text style={styles().modalHeader}>
//             {i18n.t('addCardTranslations.cancelREQ')}
//           </Text>
//           <View style={{marginVertical: 40}}>
//             <FontAwesome5Icon
//               size={100}
//               name="exclamation-triangle"
//               color={colors.orange}
//             />
//           </View>
//           <Text>{i18n.t('addCardTranslations.sure')}</Text>
//           <View style={styles().row}>
//             <HollowButton
//               onPress={() => {
//                 onHide.current = () => navigation.popToTop();
//                 setModal(false);
//               }}
//               buttonStyle={{width: '48%'}}>
//               {i18n.t('addCardTranslations.yes')}
//             </HollowButton>
//             <PrimaryButton
//               onPress={() => setModal(false)}
//               buttonStyle={{width: '48%'}}>
//               {i18n.t('addCardTranslations.no')}
//             </PrimaryButton>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };

// export default LoadingForm;
