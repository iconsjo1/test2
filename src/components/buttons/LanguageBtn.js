import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {i18n} from '../../services';

const LanguageBtn = () => {
  return (
    <TouchableOpacity
      onPress={() => i18n.setLanguage(i18n.locale === 'en' ? 'ar' : 'en')}>
      <Text style={styles.btnLink}>{i18n.t('loginTranslations.language')}</Text>
    </TouchableOpacity>
  );
};

export default LanguageBtn;

const styles = StyleSheet.create({
  btnLink: {
    color: '#4194f0',
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
});
