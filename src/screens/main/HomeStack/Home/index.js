import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Linking,
  StyleSheet,
  Keyboard,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';

import {
  LoadingWrapper,
  RoundMenu,
  Text,
  PrimaryButton,
} from '../../../../components';
import {shadows, i18n, images, routesNames} from '../../../../services';
import styles from './styles';
import ShadowView from 'react-native-simple-shadow-view';
import News from './News';
import ids from '../../../../../ids';
import UpcomingAppointments from './UpcomingAppointments';
import BorderButton from '../../../../components/buttons/BorderButton';
import {displayToast} from '../../../../services/utilities/helpers/';
import HomeLoggedinUser from '../HomeLoggedinUser';

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [loggedinUser, setLoggedinUser] = useState(null);
  const [mainAccount, setMainAccount] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    Keyboard.dismiss();
    AsyncStorage.getItem('user')
      .then((user) => {
        const parsedUser = JSON.parse(user);
        setLoggedinUser(parsedUser);
        setLoading(false);
      })
      .catch((err) => displayToast('error', err));

    AsyncStorage.getItem('mainAccount')
      .then((user) => {
        if (user) {
          const parsedUser = JSON.parse(user);
          setMainAccount(parsedUser);
        } else {
          setMainAccount(null);
        }
        setLoading(false);
      })
      .catch((err) => setMainAccount(null));
  }, [isFocused]);

  useEffect(() => Keyboard.dismiss());
  return (
    <LoadingWrapper loading={loading}>
      {loggedinUser ? (
        <HomeLoggedinUser
          navigation={navigation}
          user={loggedinUser}
          mainAccount={mainAccount}
        />
      ) : (
        <>
          <ShadowView
            style={StyleSheet.flatten([
              shadows.lightShadowBlack,
              styles().headerContainer,
            ])}>
            <Text style={styles().header}>
              {i18n.t('homeTabTranslations.header')}
            </Text>
          </ShadowView>
          <ScrollView
            testID={ids.homeIds.scrollerId}
            showsVerticalScrollIndicator={false}
            style={styles().scrollContainer}>
            <UpcomingAppointments />
            <ScrollView style={styles().scrollContainerInner}>
              <RoundMenu navigation={navigation} />
            </ScrollView>
            {/* <SocailMediaLinks /> */}
            {loggedinUser ? null : (
              <View style={styles().authActions}>
                <Text style={styles().intro}>
                  {i18n.t('homeTabTranslations.introTxt')}
                </Text>
                <PrimaryButton
                  children={i18n.t('homeTabTranslations.login')}
                  onPress={() => navigation.navigate(routesNames.login)}
                />
                <BorderButton
                  children={i18n.t('homeTabTranslations.signup')}
                  onPress={() => {
                    navigation.navigate(routesNames.signUp);
                  }}
                />
              </View>
            )}
          </ScrollView>
        </>
      )}
    </LoadingWrapper>
  );
};

export default Home;
