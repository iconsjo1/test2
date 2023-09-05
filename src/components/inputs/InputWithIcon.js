import React, {useState, useRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../services';
import {smallScreens} from '../../services/utilities/responsive';
import InputWithLabel from './InputWithLabel';

const InputWithIcon = ({
  placeholder,
  lable,
  value,
  onChange,
  iconName,
  secureTextEntry,
  keyboardType,
  handleSumbit,
}) => {
  [isPressed, setIsPressed] = useState(false);
  [isSecured, setIsSecured] = useState(secureTextEntry);

  return (
    <View>
      <InputWithLabel
        handleSumbit={handleSumbit}
        keyboardType={keyboardType}
        secureTextEntry={isSecured}
        placeholder={placeholder}
        children={lable}
        value={value}
        onChange={onChange}
      />
      {secureTextEntry ? (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles().icon}
          onPress={() => {
            setIsPressed(!isPressed);
            setIsSecured(!isSecured);
          }}>
          <View style={{padding: 10}}>
            <Icon
              name={iconName}
              size={smallScreens ? 20 : 24}
              color={isPressed ? colors.primary : colors.darkGrey}
            />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default InputWithIcon;

const styles = () =>
  StyleSheet.create({
    icon: {
      position: 'absolute',
      right: 15,
      bottom: Platform.OS === 'ios' ? -2 : smallScreens ? 5 : 5,
      zIndex: 1,
    },
  });
