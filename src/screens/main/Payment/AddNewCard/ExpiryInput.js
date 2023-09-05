// import React from 'react';
// import {StyleSheet, Text, TextInput, View} from 'react-native';
// import {colors} from '../../../../services';

// const ExpiryInput = ({onChange, value}) => {
//   const inputTwoRef = React.useRef();
//   return (
//     <View style={styles.inputContainer}>
//       <TextInput
//         keyboardType="number-pad"
//         maxLength={2}
//         style={styles.input}
//         onChangeText={onChange}
//         value={value}
//         onEndEditing={() => console.log(inputTwoRef.current.focus())}
//       />
//       <View style={styles.diver}></View>
//       <TextInput
//         ref={inputTwoRef}
//         keyboardType="number-pad"
//         maxLength={2}
//         style={styles.input}
//         onChange={onChange}
//         value={value}
//       />
//       <Text style={styles.lable}>Expairy Date</Text>
//     </View>
//   );
// };

// export default ExpiryInput;

// const styles = StyleSheet.create({
//   inputContainer: {
//     borderColor: colors.grey,
//     borderWidth: 2,
//     paddingVertical: 15,
//     paddingHorizontal: 10,
//     borderRadius: 12,
//     flex: 1,
//     flexDirection: 'row',
//   },
//   input: {
//     fontSize: 16,
//     width: '45%',
//     textAlign: 'center',
//     paddingHorizontal: 20,
//     height: '100%',
//   },
//   lable: {
//     backgroundColor: colors.whiteBg,
//     position: 'absolute',
//     top: -5,
//     left: 20,
//     paddingHorizontal: 5,
//     color: colors.darkGrey,
//   },
//   diver: {
//     width: 2,
//     backgroundColor: colors.grey,
//   },
// });
