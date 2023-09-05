import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {RippleLoader} from 'react-native-indicator';
import styles from './styles';
import {LoadingWrapper} from '../../../../../components';
import {NoResults} from '../../../../../components';
import InvoiceComponent from './InvoiceComponent';
import FlowerHeader from '../../../../../components/headers/CustomHeader/FlowerHeader';
import {i18n} from '../../../../../services';
import {
  clearCart,
  getAllOrders,
} from '../../../../../store/actions/main/flowerServiceActions';

const InvoicesOverview = ({route, navigation}) => {
  const mobileNo = route?.params?.mobileNo;
  const [loading, setLoading] = useState(true);

  const orders = useSelector((state) => state.flowers.orders);

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
    <LoadingWrapper loading={loading}>
      <View style={styles().container}>
        <FlowerHeader
          children={i18n.t('invoiceDetailsTranslations.invoices')}
          navigation={navigation}
          onPress={() => {
            dispatch(clearCart());
            navigation.goBack();
          }}
        />
        <Text style={styles().heading}>{i18n.t('orderOverview.myOrders')}</Text>
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
      </View>
    </LoadingWrapper>
  );
};

export default InvoicesOverview;
