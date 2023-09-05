import React from 'react';
import {
  I18nManager,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

import IconMD from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, fontFamilies, i18n, routesNames} from '../../../services';
import PrimaryButton from '../../buttons/PrimaryButton';
import {converENDigitsToAr} from '../../../services/utilities/helpers';
import {smallScreens} from '../../../services/utilities/responsive';

const FlowerHeader = ({navigation, btn, cart, children, onPress}) => {
  const cartList = useSelector((state) => state.flowers.cart);

  return (
    <View style={styles().headerContainer}>
      <View style={[{...styles().headerRow}, btn ? {} : {paddingBottom: 20}]}>
        <TouchableOpacity
          onPress={onPress ? () => onPress() : () => navigation.goBack()}
          style={styles().iconContainer}>
          <Icon
            color={colors.black}
            size={24}
            name={I18nManager.isRTL ? 'arrow-forward' : 'arrow-back'}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: smallScreens ? 14 : 16,
            fontFamily: fontFamilies('boldText'),
            color: colors.black,
          }}>
          {children}
        </Text>
        {cart ? (
          <TouchableOpacity
            style={{
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate(routesNames.cartOverview)}>
            <IconMD
              color={colors.black}
              size={smallScreens ? 24 : 27}
              name={'cart-outline'}
              style={
                I18nManager.isRTL
                  ? {
                      transform: [{scaleX: -1}],
                    }
                  : {}
              }
            />
            <Text
              style={{
                fontFamily: fontFamilies('boldText'),
                marginTop: 5,
              }}>
              {i18n.t('flowerCart.cart')}
            </Text>
            {cartList.length > 0 && (
              <View
                style={{
                  backgroundColor: colors.green,
                  width: 25,
                  height: 25,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: -18,
                  left: 4,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.whiteAbsolute,
                    fontFamily: fontFamilies('boldText'),
                  }}>
                  {I18nManager.isRTL
                    ? converENDigitsToAr(cartList.length)
                    : cartList.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
      {btn && (
        <PrimaryButton
          onPress={() => navigation.navigate(routesNames.shopInvoices)}
          children={i18n.t('giftsShopHome.showOrders')}
          buttonStyle={{
            marginVertical: 15,
            backgroundColor: colors.primary,
            padding: I18nManager.isRTL ? 5 : 10,
          }}
        />
      )}
    </View>
  );
};

export default FlowerHeader;

const styles = () =>
  StyleSheet.create({
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    iconContainer: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.grey,
      borderRadius: 10,
    },
    headerContainer: {
      borderBottomColor: colors.extraLightGrey,
      borderBottomWidth: 2,
      padding: 20,
      paddingBottom: 0,
    },
  });
