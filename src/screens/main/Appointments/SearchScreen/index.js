import React, {useRef, useState} from 'react';
import {View, TouchableHighlight, I18nManager} from 'react-native';
import styles from './styles';
import ViewPager from '@react-native-community/viewpager';
import SpecialitySelect from '../SpecialitySelect';
import {TouchableOpacity, Text} from '../../../../components';
import {colors, i18n} from '../../../../services';
import SelectDoctor from '../SelectDoctor';

const SearchScreen = ({navigation}) => {
  const [pageNum, setPageNum] = useState(0);
  const pagerRef = useRef();

  return (
    <View style={styles().container}>
      <View style={styles().topTab}>
        <PageSelectButton
          hilighted={pageNum === (I18nManager.isRTL ? 1 : 0)}
          onPress={() => pagerRef.current.setPage(I18nManager.isRTL ? 1 : 0)}>
          {i18n.t('appointmentTabTranslations.searchSpec')}
        </PageSelectButton>
        <PageSelectButton
          hilighted={pageNum === (I18nManager.isRTL ? 0 : 1)}
          onPress={() => pagerRef.current.setPage(I18nManager.isRTL ? 0 : 1)}>
          {i18n.t('appointmentTabTranslations.searchDoc')}
        </PageSelectButton>
      </View>
      <ViewPager
        initialPage={I18nManager.isRTL ? 1 : 0}
        onPageSelected={(e) => setPageNum(e.nativeEvent.position)}
        ref={(ref) => (pagerRef.current = ref)}
        style={{flex: 1}}>
        {I18nManager.isRTL ? (
          <>
            <PageContainer>
              <SelectDoctor
                route={{params: {}}}
                header={false}
                navigation={navigation}
              />
            </PageContainer>
            <PageContainer>
              <SpecialitySelect navigation={navigation} />
            </PageContainer>
          </>
        ) : (
          <>
            <PageContainer>
              <SpecialitySelect navigation={navigation} />
            </PageContainer>
            <PageContainer>
              <SelectDoctor
                route={{params: {}}}
                header={false}
                navigation={navigation}
              />
            </PageContainer>
          </>
        )}
      </ViewPager>
    </View>
  );
};

export default SearchScreen;

const PageContainer = ({children}) => (
  <View style={styles().pagerContainer}>{children}</View>
);

const PageSelectButton = ({children, onPress, hilighted}) => (
  <TouchableHighlight
    underlayColor={colors.mediumLightGrey}
    onPress={onPress}
    style={{
      flex: 1,
      backgroundColor: hilighted ? colors.primary : 'transparent',
    }}>
    <>
      <Text
        style={[
          styles().buttonText,
          {color: hilighted ? colors.whiteAbsolute : colors.black},
        ]}>
        {children}
      </Text>
      <View
        style={{
          backgroundColor: !hilighted ? colors.primary : colors.grey,
          width: '100%',
          height: 3,
        }}
      />
    </>
  </TouchableHighlight>
);
