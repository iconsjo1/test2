import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {Text, InputWithLabel, PrimaryButton} from '../../../components';
import {i18n, images, setUserData} from '../../../services';
import styles from './Styles';

const Form = ({number, onPress, setNumber}) => {
  useEffect(() => {
    setUserData(setNumber);
  }, []);

  return (
    <View style={{paddingTop: 30, margin: 20}}>
      {/* aref edit */}
      {/* <View>
        <Image source={images.medicalResult1} style={styles().imageStyle} />
      </View>
      <View>
        <Text style={styles().titleStyle}>
          {i18n.t('myAppointments.title')}
        </Text>
      </View>
      <View style={{marginTop: 40}}>
        <InputWithLabel
          maxLength={13}
          keyboardType="phone-pad"
          value={number}
          containerStyle={{marginBottom: 40}}
          onChange={(data) => setNumber(data)}>
          {i18n.t('myAppointments.phone')}
        </InputWithLabel>
        <PrimaryButton onPress={onPress}>
          {i18n.t('myAppointments.showAppointments')}
        </PrimaryButton>
      </View> */}
    </View>
  );
};

export default Form;
