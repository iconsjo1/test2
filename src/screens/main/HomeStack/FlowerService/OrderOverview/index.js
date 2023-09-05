import React, { useState } from 'react';
import { Text, View, FlatList, I18nManager, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import styles from './styles';
import { AppButton, LoadingWrapper } from '../../../../../components';
import FlowerHeader from '../../../../../components/headers/CustomHeader/FlowerHeader';
import { colors, fontFamilies, HP, i18n, WP } from '../../../../../services';
import CartItem from '../CartItem';
import { converENDigitsToAr } from '../../../../../services/utilities/helpers';
import { rateOrder } from '../../../../../store/actions/main/flowerServiceActions';
import { smallScreens } from '../../../../../services/utilities/responsive';
import { AirbnbRating, Rating } from 'react-native-ratings';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';

const OrderOverview = ({ route, navigation }) => {
  const order = route?.params?.invoice;
  console.log(order);
  const oneOrder = route?.params?.oneOrder;
  const items = useSelector((state) => state.flowers.cart);
  const paiedOrder = useSelector((state) => state.flowers.orders);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [rate, setRate] = useState();
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);

  const products = useSelector((state) => state.flowers.products);
  const mappedOrderItems = paiedOrder[0]?.items.map((el) => {
    return {
      ...el,
      price: el.unitPrice,
      count: el.quantity,
    };
  });
  const cartItemsFromProducts = products.filter((el) => {
    return paiedOrder[0]?.items.some((f) => f.serviceId === el.id);
  });

  const cartItemToUpdate = cartItemsFromProducts.map((el) => {
    return {
      ...el,
      ...mappedOrderItems.find((f) => f.serviceId === el.id),
    };
  });
  console.log('paiedOrder', paiedOrder);
  const dispatch = useDispatch();

  const handleRating = () => {
    console.log({ orderRate: rate, orderRateReview: msg });
    setLoading(true);
    dispatch(
      rateOrder(
        order.id,
        { orderRate: rate, orderRateReview: msg },
        () => {
          setLoading(false);
          setTimeout(() => {
            setIsModalVisible(false);
            navigation.goBack()
          }, 200);
        },
        () => {
          setLoading(false);
          setTimeout(() => {
            setIsModalVisible(false);
          }, 200);
        },
      ),
    );
  };

  return (
    <LoadingWrapper white>
      <View style={styles().container}>
        <FlowerHeader
          navigation={navigation}
          children={`${i18n.t('orderOverview.order')} #${I18nManager.isRTL
            ? converENDigitsToAr(
              oneOrder ? paiedOrder[0].orderId : order.orderId,
            )
            : oneOrder
              ? paiedOrder[0].orderId
              : order.orderId
            }`}
        />
        <View
          style={{
            padding: 20,
          }}>
          <Text style={styles().headingOrder}>
            {i18n.t('orderOverview.trip')}
          </Text>

          <OrderState
            state={oneOrder ? paiedOrder[0].orderStatus : order.orderStatus}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              ...styles().heading,
              paddingBottom: 10,
              textAlign: I18nManager.isRTL ? 'left' : 'auto',
            }}>
            {i18n.t('orderOverview.orderSummary')}
          </Text>
        </View>
        <View style={styles().contentContainer}>
          <FlatList
            ListFooterComponent={
              <View style={styles().summary}>
                <View style={styles().priceRow}>
                  <Text style={styles().heading}>
                    {' '}
                    {i18n.t('flowerCart.subtotal')}
                  </Text>
                  <Text style={styles().subHeading}>
                    {I18nManager.isRTL
                      ? converENDigitsToAr(
                        oneOrder ? paiedOrder[0].netPrice : order.netPrice,
                      )
                      : oneOrder
                        ? paiedOrder[0].netPrice
                        : order.netPrice}{' '}
                    {i18n.t('giftsShopHome.sar')}
                  </Text>
                </View>
                <View style={[styles().priceRow, styles().borderBottom]}>
                  <Text style={styles().heading}>
                    {' '}
                    {i18n.t('flowerCart.VAT')}{' '}
                    {I18nManager.isRTL ? converENDigitsToAr('15') : 15}%
                  </Text>
                  <Text style={styles().subHeading}>
                    {I18nManager.isRTL
                      ? converENDigitsToAr(
                        oneOrder ? paiedOrder[0].vatAmount : order.vatAmount,
                      )
                      : oneOrder
                        ? paiedOrder[0].vatAmount
                        : order.vatAmount}{' '}
                    {i18n.t('giftsShopHome.sar')}
                  </Text>
                </View>
                <View style={styles().priceRow}>
                  <Text style={styles().primaryHeading}>
                    {' '}
                    {i18n.t('flowerCart.total')}
                  </Text>
                  <Text style={styles().primaryHeading}>
                    {I18nManager.isRTL
                      ? converENDigitsToAr(
                        oneOrder ? paiedOrder[0].netAmount : order.netAmount,
                      )
                      : oneOrder
                        ? paiedOrder[0].netAmount
                        : order.netAmount}{' '}
                    {i18n.t('giftsShopHome.sar')}
                  </Text>
                </View>

                {order?.orderRate === null && order?.orderStatus === '3' ?
                  <AppButton
                    onPress={() => setIsModalVisible(true)}
                    text={i18n.t('orderOverview.rate')}
                    btnStyle={styles().rateBtn}
                    textStyle={{ fontSize: smallScreens ? 12 : 12 }}
                  />
                  :
                  <></>
                }

                {paiedOrder[0]?.orderRate === null && paiedOrder[0]?.orderStatus === '3' ?
                  <AppButton
                    onPress={() => setIsModalVisible(true)}
                    text={i18n.t('orderOverview.rate')}
                    btnStyle={styles().rateBtn}
                    textStyle={{ fontSize: smallScreens ? 12 : 12 }}
                  />
                  :
                  <></>
                }
              </View>
            }
            contentContainerStyle={{
              padding: 20,
            }}
            showsVerticalScrollIndicator={false}
            data={oneOrder ? cartItemToUpdate : items}
            keyExtractor={(item, i) => String(i)}
            renderItem={({ item }) => <CartItem item={item} countOnly />}
          />
        </View>
      </View>


      <Modal
        avoidKeyboard={true}
        onBackdropPress={() => setIsModalVisible(false)}
        isVisible={isModalVisible}>
        <View
          style={{
            backgroundColor: colors.white,
            padding: 20,
            borderRadius: 10,
          }}>
          <Text
            style={{
              ...styles().baseFont,
              alignSelf: 'center',
              paddingVertical: 10,
            }}>
            {i18n.t('orderOverview.rateHeading')}
          </Text>
          {I18nManager.isRTL ? (
            <AirbnbRating
              defaultRating={5}
              size={35}
              count={5}
              showRating={false}
              onFinishRating={(value) => setRate(value)}
            />
          ) : (
            <Rating
              startingValue={5}
              ratingBackgroundColor={colors.lightGrey}
              tintColor={colors.white}
              type="custom"
              ratingCount={5}
              imageSize={50}
              showRating={false}
              onFinishRating={(rating) => setRate(rating)}
            />
          )}
          <TextInput
            value={msg}
            onChangeText={(val) => setMsg(val)}
            numberOfLines={10}
            multiline
            placeholder={i18n.t('inpatientAlert.rateMsg')}
            style={styles().inputStyle}
          />
          <AppButton
            text={i18n.t('inpatientOrder.rate')}
            loading={loading}
            onPress={() => {
              if (!rate) {
                Toast.show(
                  I18nManager.isRTL
                    ? 'من فضلك قيم الخدمة'
                    : 'Please, Rate the service',
                );
              } else {
                handleRating();
              }
            }}
          />
        </View>
      </Modal>

    </LoadingWrapper>
  );
};
const OrderState = ({ state }) => (
  <View
    style={{
      marginVertical: 10,
      alignItems: 'flex-start',
    }}>
    <View
      style={{
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 2,
          backgroundColor: colors.skyBlue,
          height: 100,
          position: 'absolute',
          left: 24,
          top: 10,
        }}></View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: WP('90'),
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor:
                state === '1' || state === '2' || state === '3'
                  ? colors.skyBlue
                  : colors.mediumLightGrey,
              width: 30,
              height: 30,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Icon name="check" color={colors.whiteAbsolute} size={15} />
          </View>
          <Text
            style={{
              fontFamily: fontFamilies('boldText'),
            }}>
            {' '}
            {i18n.t('orderOverview.new')}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: WP('90'),
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor:
                state === '2' || state === '3'
                  ? colors.skyBlue
                  : colors.mediumLightGrey,
              width: 30,
              height: 30,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Icon name="check" color={colors.whiteAbsolute} size={15} />
          </View>
          <Text
            style={{
              fontFamily: fontFamilies('boldText'),
            }}>
            {i18n.t('orderOverview.inprogress')}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: WP('90'),
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor:
                state !== '3' ? colors.mediumLightGrey : colors.skyBlue,
              width: 30,
              height: 30,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Icon name="check" color={colors.whiteAbsolute} size={15} />
          </View>
          <Text
            style={{
              fontFamily: fontFamilies('boldText'),
            }}>
            {i18n.t('orderOverview.delivered')}
          </Text>
        </View>
        {/* <Text>09:20PM</Text> */}
      </View>
    </View>
  </View>
);

export default OrderOverview;
