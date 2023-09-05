import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {RippleLoader} from 'react-native-indicator';

import styles from './styles';
import {LoadingWrapper, RestaurantHeader} from '../../../../../components';
import {NoResults} from '../../../../../components';
import InvoiceComponent from './InvoiceComponent';

import {i18n} from '../../../../../services';
import {
  getAllOrders,
  clearCart,
} from '../../../../../store/actions/main/restaurantActions';

const RestaurantInvoicesOverview = ({route, navigation}) => {
  const mobileNo = route?.params?.mobileNo;
  const [loading, setLoading] = useState(false);

  const orders = useSelector((state) => state.restaurant.orders);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(
      getAllOrders(
        null,
        mobileNo,
        () => {
          setLoading(false);
        },
        () => {
          setLoading(false);
        },
      ),
    );
  }, [isFocused]);

  const handleRefresh = () => {
    dispatch(
      getAllOrders(
        null,
        mobileNo,
        () => {
          setLoading(false);
        },
        () => {
          setLoading(false);
        },
      ),
    );
  };
  return (
    <LoadingWrapper>
      <View style={styles().container}>
        <RestaurantHeader
          onPress={() => {
            dispatch(clearCart());
            navigation.goBack();
          }}
          navigation={navigation}
          children={i18n.t('invoiceDetailsTranslations.invoices')}
        />
        <Text style={styles().heading}>{i18n.t('orderOverview.myOrders')}</Text>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <RippleLoader />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshing={loading}
            onRefresh={handleRefresh}
            contentContainerStyle={{
              padding: 20,
            }}
            data={orders}
            keyExtractor={(el) => String(el.id)}
            renderItem={({item}) => (
              <InvoiceComponent
                handleRefresh={handleRefresh}
                invoice={item}
                navigation={navigation}
              />
            )}
            ListEmptyComponent={
              <NoResults text={i18n.t('orderOverview.noInvoices')} />
            }
          />
        )}
      </View>
    </LoadingWrapper>
  );
};

export default RestaurantInvoicesOverview;
