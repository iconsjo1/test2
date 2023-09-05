import React from 'react';
import {
  Text,
  View,
  ScrollView,
  I18nManager,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import LoadingWrapper from '../../../../components/generic/LoadingWrapper';
import AuthHeader from '../../../../components/headers/CustomHeader/AuthHeader';
import {colors, i18n, routesNames, WP} from '../../../../services';
import categories from './data/categories';
import pages from './data';

const HospitalGuide = ({navigation}) => {
  return (
    <LoadingWrapper>
      <SafeAreaView style={styles().container}>
        <View style={{padding: 20}}>
          <AuthHeader
            children={i18n.t('loggedinUser.guide')}
            navigation={navigation}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 40,
          }}>
          {categories.map((categorie, i) => (
            <TouchableOpacity
              key={i}
              onPress={() =>
                navigation.navigate(routesNames.categorieViewer, {
                  pageName: categorie,
                  pages: pages[i],
                })
              }
              activeOpacity={0.7}
              style={styles().categorieContainer}>
              <Text style={styles().categorieText}>{categorie}</Text>
              <Icon
                style={styles().categorieIcon}
                name={
                  I18nManager.isRTL
                    ? 'keyboard-arrow-left'
                    : 'keyboard-arrow-right'
                }
                size={26}
                color={colors.grey}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </LoadingWrapper>
  );
};

export default HospitalGuide;
