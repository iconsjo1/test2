import React, {useState, useEffect} from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import {StyleSheet, SafeAreaView, Keyboard} from 'react-native';
import {
  WP,
  colors,
  fontFamilies,
  lineHeights,
  routesNames,
  i18n,
} from '../../../services';
import {useSelector} from 'react-redux';
import {Text, TouchableOpacity} from '../../../components';
import ids from '../../../../ids';

const TabBarComponent = ({state, navigation}) => {
  const [keyboardVisible, setKeyboardVisible] = useState(true);

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(false),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(true),
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const {routes, index} = state;

  // const theme = useSelector((state) => state.theme.themeColor);
  const names = [
    i18n.t('tabBarTranslations.home'),
    i18n.t('tabBarTranslations.calendar'),
    // i18n.t('tabBarTranslations.videocam'),
    i18n.t('tabBarTranslations.invoice_1'),

    i18n.t('tabBarTranslations.person'),
    i18n.t('tabBarTranslations.menu'),
  ];
  const testIDs = [
    ids.bottomTabIds.home,
    ids.bottomTabIds.appointments,
    // ids.bottomTabIds.udh_live,
    ids.bottomTabIds.invoice_1,
    ids.bottomTabIds.reports,
    ids.bottomTabIds.menu,
  ];
  if (!keyboardVisible) return null;
  return (
    <SafeAreaView style={styles().tabBarContainer}>
      {routes.map((el, i) => (
        <TabBarIcon
          key={el.key}
          onPress={() => navigation.navigate(el.name)}
          selected={i === index}
          iconName={iconNames[i]}
          testID={testIDs[i]}
          name={names[i]}
        />
      ))}
    </SafeAreaView>
  );
};

export default TabBarComponent;

const TabBarIcon = ({selected, name, testID, onPress, iconName}) => (
  <TouchableOpacity
    testID={testID}
    onPress={onPress}
    style={styles().tabBarComponent}>
    <Icons
      name={iconName}
      color={!selected ? colors.grey : colors.skyBlue}
      size={25}
    />
    <Text
      style={{
        color: !selected ? colors.grey : colors.skyBlue,
        fontSize: WP('100') < 420 ? 12 : 14,
        textAlign: 'center',

        lineHeight: lineHeights('small'),
      }}>
      {name}
    </Text>
  </TouchableOpacity>
);

const styles = () =>
  StyleSheet.create({
    tabBarContainer: {
      width: WP('100'),
      flexDirection: 'row',
      backgroundColor: colors.whiteBg,
      borderTopColor: colors.lightGrey,
      borderTopWidth: 1,
      justifyContent: 'space-around',
    },
    tabBarComponent: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 7.5,
    },
  });

const iconNames = [
  'home',
  'calendar',
  // "videocam",
  'receipt',
  'person',
  'menu',
];
