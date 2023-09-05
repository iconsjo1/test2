import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  I18nManager,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {RippleLoader} from 'react-native-indicator';
import styles from './styles';
import AuthHeader from '../../../../components/headers/CustomHeader/AuthHeader';
import {
  colors,
  images,
  i18n,
  fontFamilies,
  routesNames,
  HP,
} from '../../../../services';
import Invoice from './InvoiceCompactComponent/Invoice';
import {LoadingWrapper} from '../../../../components';
import {getInvoices} from '../../../../store/actions/main/invoicesAndPaymentActions';

const tabs = [
  {
    name: I18nManager.isRTL ? 'مدفوعة' : 'Paied',
  },
  {
    name: I18nManager.isRTL ? 'غير مدفوعة' : 'Unpaied',
  },
];
const EmptyList = ({selected, data}) => (
  <View
    style={{
      alignItems: 'center',
      flex: 1,
      height: HP('62'),
      justifyContent: 'center',
    }}>
    {data == undefined ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <RippleLoader color={colors.skyBlue} />
        <Text
          style={{
            fontFamily: fontFamilies('boldText'),
            color: colors.black,
            marginTop: 20,
          }}>
          {I18nManager.isRTL
            ? 'جاري تحميل الفواتير ...'
            : 'Loading your invoices'}
        </Text>
      </View>
    ) : (
      <>
        <Image source={images.notFound} style={{width: 100, height: 100}} />
        <Text
          style={{
            fontFamily: fontFamilies('boldTextHeader'),
            marginTop: 10,
            color: colors.black,
          }}>
          {I18nManager.isRTL
            ? `لا يوجد فواتير ${selected === 0 ? `مدفوعة` : `غير مدفوعة`}`
            : `We can't find any ${
                selected === 0 ? `paied` : `unpaied`
              } invoices`}
        </Text>
      </>
    )}
  </View>
);

const InvoiceDetails = ({route, navigation}) => {
  const {mrnOrTransCoutn} = route.params;
  const [user, setUser] = useState(null);
  const [dataLoader, setDataLoader] = useState(false);
  const [invoices, setInvoices] = useState(null);
  const [selected, setSelected] = useState(1);
  const paiedInvoices = invoices?.filter(
    (invoice) => invoice.invoiceStatus == 1,
  );
  const unpaiedInVoices = invoices?.filter(
    (invoice) => invoice.invoiceStatus == 0,
  );

  console.log(invoices);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    setDataLoader(true);
    AsyncStorage.getItem('user')
      .then((res) => {
        setDataLoader(false);
        const parsedUser = JSON.parse(res);
        setUser(parsedUser);
      })
      .catch((err) => setDataLoader(false));
  }, [isFocused]);

  useEffect(() => {
    if (mrnOrTransCoutn) {
      setDataLoader(true);
      dispatch(
        getInvoices(
          mrnOrTransCoutn,
          (data) => {
            setDataLoader(false);
            setInvoices(data);
          },
          (data) => {
            setDataLoader(false);
            setInvoices(data);
          },
        ),
      );
    }
  }, [selected]);

  const handleRefresh = () => {
    setDataLoader(true);
    dispatch(
      getInvoices(
        mrnOrTransCoutn,
        (data) => {
          setDataLoader(false);

          setInvoices(data);
        },
        (data) => {
          setDataLoader(false);
          setInvoices(data);
        },
      ),
    );
  };

  return (
    <LoadingWrapper navigation={navigation}>
      <View style={styles().container}>
        {/* Header */}

        <LoadingWrapper>
          <View style={{paddingHorizontal: 20, marginTop: 20}}>
            <View style={styles().header}>
              <TouchableOpacity
                style={styles().backBtn}
                onPress={() => {
                  if (user) {
                    navigation.navigate(routesNames.home);
                  } else {
                    navigation.goBack();
                  }
                }}>
                <Icon
                  name={i18n.locale === 'ar' ? 'arrow-forward' : 'arrow-back'}
                  size={24}
                  color={colors.black}
                />
              </TouchableOpacity>
              <Text style={styles().headerTxt}>
                {i18n.t('invoicesTranslations.invoices')}
              </Text>
              <View></View>
            </View>
          </View>
          {/* Invoice List */}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              marginTop: 20,
              paddingHorizontal: 20,
            }}>
            {tabs.map((tab, index) =>
              selected === index ? (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelected(index);
                  }}
                  activeOpacity={0.9}
                  style={{
                    paddingVertical: 10,
                    borderWidth: 1,
                    borderColor: colors.skyBlue,
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: colors.skyBlue,
                  }}>
                  <Text
                    style={{
                      color: colors.whiteAbsolute,
                      fontFamily: fontFamilies('boldText'),
                    }}>
                    {tab.name}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelected(index);
                  }}
                  activeOpacity={0.7}
                  style={{
                    paddingVertical: 10,
                    borderWidth: 1,
                    borderColor: colors.skyBlue,
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.skyBlue,
                      fontFamily: fontFamilies('boldText'),
                    }}>
                    {tab.name}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>

          <View style={styles().invoiceList}>
            <FlatList
              keyExtractor={(item) => item.id}
              refreshing={dataLoader}
              contentContainerStyle={{paddingBottom: 159}}
              ListEmptyComponent={
                <EmptyList
                  selected={selected}
                  data={selected === 1 ? unpaiedInVoices : paiedInvoices}
                />
              }
              onRefresh={handleRefresh}
              showsVerticalScrollIndicator={false}
              data={selected === 1 ? unpaiedInVoices : paiedInvoices}
              renderItem={({item, index}) => (
                <View
                  key={index}
                  style={{
                    width: '100%',
                    marginVertical: 5,
                    padding: 5,
                  }}>
                  <Invoice
                    key={index}
                    navigation={navigation}
                    invoice={item}
                    paied={selected === 1 ? false : true}
                  />
                </View>
              )}
            />
            <View style={{marginBottom: 50}}></View>
          </View>
        </LoadingWrapper>
      </View>
    </LoadingWrapper>
  );
};

export default InvoiceDetails;
