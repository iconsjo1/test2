import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  ActivityIndicator,
  I18nManager,
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import {LoadingWrapper, PrimaryButton} from '../../../../../components';
import AuthHeader from '../../../../../components/headers/CustomHeader/AuthHeader';
import {
  colors,
  fontFamilies,
  i18n,
  images,
  routesNames,
  shadows,
} from '../../../../../services';
import styles from './styles';
import {Detail} from '../';
import {
  getAllInpatientRequests,
  rateService,
} from '../../../../../store/actions/main/inpatientServicesActions';
import Order from '../OrderComponent';
import {converENDigitsToAr} from '../../../../../services/utilities/helpers';
import InpatientHeader from '../../../../../components/headers/CustomHeader/InpatientHeader';

const RateOurServices = ({route, navigation}) => {
  const {inpatient} = route.params;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const sortedRequests = requests.sort((a, b) => {
    if (a.RATE == null && a.RATE == null) return -1;
  });

  console.log(inpatient);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    dispatch(
      getAllInpatientRequests(
        inpatient.ADMISSIONNO,
        (requests) => {
          setRequests(requests);
          setLoading(false);
        },
        () => setLoading(false),
        1,
      ),
    );
  }, [isFocused]);

  const handleRating = (admissionNumber, orderNo, rateAndMsg) => {
    dispatch(rateService(admissionNumber, orderNo, rateAndMsg));
  };
  return (
    <LoadingWrapper>
      <View style={styles().container}>
        <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
          <AuthHeader
            navigation={navigation}
            children={i18n.t('inpatientDetailsTranslation.inpatient')}
          />
        </View>
        <InpatientHeader inpatient={inpatient} />

        {loading ? (
          <View style={{flex: 1, alignItems: 'center', marginTop: 10}}>
            <ActivityIndicator size="large" color={colors.skyBlue} />
          </View>
        ) : (
          <FlatList
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  marginTop: 50,
                  alignItems: 'center',
                }}>
                <Image
                  source={images.notFound}
                  style={{width: 100, height: 100}}
                />
                <Text>
                  {I18nManager.isRTL ? 'لا يوجد طلبات' : 'You have no requests'}
                </Text>
              </View>
            )}
            refreshing={loading}
            onRefresh={() => {
              dispatch(
                getAllInpatientRequests(
                  inpatient.ADMISSIONNO,
                  (requests) => {
                    setRequests(requests);
                    setLoading(false);
                  },
                  () => setLoading(false),
                  1,
                ),
              );
            }}
            data={sortedRequests}
            keyExtractor={(item) => item.REQ_NO.toString()}
            renderItem={({item, i}) => (
              <Order
                navigation={navigation}
                order={item}
                handleRating={handleRating}
              />
            )}
          />
        )}
      </View>
    </LoadingWrapper>
  );
};

export default RateOurServices;
