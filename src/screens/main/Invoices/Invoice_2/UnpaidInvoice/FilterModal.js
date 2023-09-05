// import React, {useState, useRef} from 'react';
// import {View, I18nManager, StyleSheet} from 'react-native';
// import {
//   Text,
//   PrimaryButton,
//   TouchableOpacity,
//   FilterOverModal,
// } from '../../../../../components';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {i18n, colors, WP, fontFamilies} from '../../../../../services';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Modal from 'react-native-modal';
// import DatePicker from 'react-native-datepicker';

// const FilterModal = ({
//   categories,
//   genders,
//   filter,
//   cancelFilter,
//   show,
//   setShow,
// }) => {
//   const [showCategories, setShowCategories] = useState(false);
//   const [showGender, setShowGender] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(false);
//   const [selectedSEX, setSelectedSEX] = useState(false);
//   const clearValues = useRef(true);
//   const snap = useRef({
//     selectedCategory: undefined,
//     selectedSEX: undefined,
//   });

//   const onModalHide = () => {
//     if (clearValues.current) {
//       const {selectedCategory, selectedSEX} = snap.current;
//       setSelectedCategory(selectedCategory);
//       setSelectedSEX(selectedSEX);
//     } else {
//       snap.current = {
//         selectedCategory,
//         selectedSEX,
//       };
//       clearValues.current = true;
//     }
//   };

//   return (
//     <Modal
//       useNativeDriver
//       backdropColor={colors.modalBackDrop}
//       onModalHide={onModalHide}
//       isVisible={show}
//       style={styles().bottomModal}
//       onBackdropPress={() => setShow(false)}>
//       {snap.current.selectedCategory || snap.current.selectedSEX ? (
//         <TouchableOpacity
//           onPress={() => {
//             snap.current = {
//               selectedCategory: undefined,
//               selectedSEX: undefined,
//             };
//             setShow(false);
//             filter({});
//           }}
//           style={styles().clearButton}>
//           <MaterialIcons name="clear-all" size={17} color={colors.black} />
//           <Text style={styles().clearText}>
//             {i18n.t('reportsTabTranslations.clear')}
//           </Text>
//         </TouchableOpacity>
//       ) : null}
//       <View style={styles().modalContent}>
//         <View style={styles().modalContenHeaderStyle}></View>
//         <Text style={styles().selectTextStyle}>
//           {i18n.t('reportsTabTranslations.sortResult')}
//         </Text>
//         <TouchableOpacity
//           style={styles().inputStyle}
//           onPress={() => setShowCategories(true)}>
//           <View style={styles().filterStyle}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Fontisto name={'doctor'} size={30} color={colors.black} />
//               <Text style={{color: colors.black, marginLeft: 10}}>
//                 {selectedCategory
//                   ? i18n.locale === 'ar'
//                     ? categories.find((el) => el.CODE === selectedCategory)
//                         .A_NAME
//                     : categories.find((el) => el.CODE === selectedCategory)
//                         .E_NAME
//                   : i18n.t('selectDoctorsTranslations.selectCat')}
//               </Text>
//             </View>
//             <AntDesign name="caretdown" size={17} color={colors.lightGrey} />
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles().inputStyle}
//           onPress={() => setShowGender(true)}>
//           <View style={styles().filterStyle}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Fontisto name={'transgender'} size={28} color={colors.black} />
//               <Text style={{color: colors.black, marginLeft: 10}}>
//                 {selectedSEX
//                   ? i18n.locale === 'ar'
//                     ? genders.find((el) => el.E_NAME === selectedSEX).A_NAME
//                     : genders.find((el) => el.E_NAME === selectedSEX).E_NAME
//                   : i18n.t('selectDoctorsTranslations.selectGender')}
//               </Text>
//             </View>
//             <AntDesign name="caretdown" size={17} color={colors.lightGrey} />
//           </View>
//         </TouchableOpacity>

//         <PrimaryButton
//           onPress={() => {
//             clearValues.current = false;
//             filter({
//               CODE: selectedCategory,
//               SEX: selectedSEX,
//             });
//             setShow(false);
//           }}>
//           {i18n.t('reportsTabTranslations.apply')}
//         </PrimaryButton>
//         <PrimaryButton
//           onPress={cancelFilter}
//           buttonStyle={{backgroundColor: colors.secondary}}
//           containerStyle={{marginTop: 0}}>
//           {i18n.t('reportsTabTranslations.cancel')}
//         </PrimaryButton>
//       </View>

//       {showCategories ? (
//         <FilterOverModal
//           data={categories
//             .map((el) => (i18n.locale === 'ar' ? el.A_NAME : el.E_NAME))
//             .sort()}
//           onSelect={(cat) => {
//             const catEl = categories.find(
//               (el) => el.A_NAME === cat || cat === el.E_NAME,
//             );
//             setSelectedCategory(catEl.CODE);
//             setShowCategories(false);
//           }}
//           onPressCancel={() => setShowCategories(false)}
//           headerText={i18n.t('selectDoctorsTranslations.selectCat')}
//           buttonText={i18n.t('reportsTabTranslations.cancel')}
//         />
//       ) : null}
//       {showGender ? (
//         <FilterOverModal
//           data={genders
//             .map((el) => (i18n.locale === 'ar' ? el.A_NAME : el.E_NAME))
//             .sort()}
//           onSelect={(gender) => {
//             const genderEl = genders.find(
//               (el) => el.A_NAME === gender || gender === el.E_NAME,
//             );
//             setSelectedSEX(genderEl.E_NAME);
//             setShowGender(false);
//           }}
//           onPressCancel={() => setShowGender(false)}
//           headerText={i18n.t('selectDoctorsTranslations.selectCat')}
//           buttonText={i18n.t('reportsTabTranslations.cancel')}
//         />
//       ) : null}
//     </Modal>
//   );
// };

// export default FilterModal;

// export const Item = ({name, onPress}) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={{
//         flex: 1,
//         height: 30,
//         backgroundColor: colors.extraLightGrey,
//         padding: 4,
//         borderRadius: 4,
//         marginVertical: 2,
//       }}>
//       <Text style={{textAlign: 'center', fontSize: 15, color: colors.black}}>
//         {name}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// const styles = () =>
//   StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: colors.whiteBg,
//     },
//     selectContent: {
//       backgroundColor: colors.white,
//       borderRadius: 5,
//       padding: 20,
//     },
//     filterStyle: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//     },
//     selectModal: {
//       flex: 1,
//       backgroundColor: 'rgba(52, 52, 52, 0.6)',
//       zIndex: 5,
//       justifyContent: 'center',
//     },
//     selectHeader: {
//       flexDirection: 'row',
//       justifyContent: 'center',
//       padding: 10,
//     },
//     inputStyle: {
//       marginVertical: 7,
//       borderWidth: 1,
//       width: WP('87'),
//       backgroundColor: colors.whiteBg,
//       height: 50,
//       justifyContent: 'center',
//       borderColor: '#F0F0F0',
//       padding: 10,
//       borderRadius: 5,
//     },

//     rltInput: {
//       textAlign: 'right',
//     },
//     modalContenHeaderStyle: {
//       height: 6,
//       width: 48,
//       backgroundColor: '#E0E0E0',
//       alignSelf: 'center',
//       borderRadius: 15,
//     },
//     selectTextStyle: {
//       color: colors.black,
//       fontSize: 16,
//       marginBottom: 25,
//       marginTop: 25,
//       fontFamily: fontFamilies('boldText'),
//     },
//     loadingContainer: {
//       flex: 1,
//       backgroundColor: colors.whiteBg,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     backTouch: {
//       borderColor: '#CCCCCC',
//       borderWidth: 1,
//       padding: 10,
//       borderRadius: 10,
//     },
//     modalContent: {
//       backgroundColor: colors.white,
//       padding: 25,
//       justifyContent: 'flex-start',
//       alignItems: 'flex-start',
//       paddingHorizontal: 30,
//       borderTopLeftRadius: 18,
//       borderTopRightRadius: 18,
//       zIndex: 1,
//     },
//     bottomModal: {
//       justifyContent: 'flex-end',
//       margin: 0,
//     },
//     clearButton: {
//       alignSelf: 'flex-end',
//       backgroundColor: colors.whiteBg,
//       padding: 10,
//       flexDirection: 'row',
//       alignItems: 'center',
//       margin: 10,
//       borderRadius: 30,
//     },
//     clearText: {
//       paddingHorizontal: 10,
//     },
//   });
