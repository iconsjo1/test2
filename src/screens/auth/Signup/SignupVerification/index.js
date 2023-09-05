import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles';
import {LoadingWrapper} from '../../../../components';

import AuthHeader from '../../../../components/headers/CustomHeader/AuthHeader';
import Button from '../../../../components/buttons/PrimaryButton';
import {
  colors,
  routesNames,
  i18n,
  convertFromArabic,
} from '../../../../services';
import {
  resendPasscode,
  verifyPasscode,
} from '../../../../store/actions/auth/registerAction';

const CELL_COUNT = 4;

const SignupVerification = ({route, navigation}) => {
  const {user, storedUser} = route.params;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const [timerCount, setTimer] = useState(60);
  const [dummy, setDummy] = useState(1);
  const hasUnsavedChanges = true;

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
    if (dummy === 1) {
      setDummy(0);
    }
    return () => clearInterval(interval);
    //each count lasts for a second

    //cleanup the interval on complete
  }, [dummy]);

  useEffect(() => {
    if (value.length === 0) {
      setErrors({message: i18n.t('verificationTranslations.verificationErr')});
    } else if (value.length >= 3) {
      setErrors(null);
    }
  }, [value]);

  return (
    <LoadingWrapper loading={loading}>
      <View style={styles().container}>
        {/* Header */}
        <View>
          <AuthHeader
            children={i18n.t('verificationTranslations.verification')}
            navigation={navigation}
            // backRoute={routesNames.signUp}
          />
          <Text style={styles().headerTxt}>
            {i18n.t('verificationTranslations.verificationHelpTxt')}
          </Text>
        </View>
        {/* Header End */}
        {/* Verification Code */}
        <View style={styles().verificaxtionCode}>
          <CodeField
            autoFocus={true}
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={{
              ...styles().codeFieldRoot,
              flexDirection: i18n.locale === 'ar' ? 'row-reverse' : 'row',
            }}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View
                // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles().cellRoot, isFocused && styles().focusCell]}>
                <Text style={styles().cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
          <View>
            {errors ? (
              <Text style={{...styles().error, marginVertical: 20}}>
                {errors.message}
              </Text>
            ) : null}
          </View>
          <View style={styles().row}>
            <Text style={styles().txt}>
              {i18n.t('verificationTranslations.otp')}
            </Text>
            {timerCount > 0 ? (
              <Text style={styles().timer}>
                {timerCount > 9 ? `0:${timerCount}` : `0:0${timerCount}`}
              </Text>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (timerCount <= 0) {
                    if (storedUser) {
                      const parasedUser = JSON.parse(storedUser);
                      dispatch(resendPasscode(parasedUser));
                      setTimer(60);
                      setDummy(1);
                    } else {
                      dispatch(resendPasscode(user));
                      setTimer(60);
                      setDummy(1);
                    }
                  }
                }}>
                <Text style={styles().timer}>
                  {i18n.t('verificationTranslations.resend')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Button
          children={i18n.t('verificationTranslations.verify')}
          onPress={() => {
            console.log(value);
            if (storedUser) {
              const parasedUser = JSON.parse(storedUser);
              const data = {
                udhId: parasedUser.udhId,
                passcode: convertFromArabic(value),
              };
              dispatch(verifyPasscode(data, navigation));
            } else {
              const passcodeVerification = {
                udhId: user.udhId,
                passcode: convertFromArabic(value),
              };
              dispatch(verifyPasscode(passcodeVerification, navigation));
            }
          }}
        />
        {/* Verification Code End */}
      </View>
    </LoadingWrapper>
  );
};

export default SignupVerification;
