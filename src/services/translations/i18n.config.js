import i18n from 'i18n-js';
import { I18nManager, Platform } from 'react-native';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-community/async-storage';
import translations from './translations';
import { language } from '..';

i18n.locale = undefined;

i18n.setLanguage = async (lang, restart = true) => {
    if (restart) {
        const langPreset = await AsyncStorage.getItem(language);
        if (lang === langPreset) return;
    }
    i18n.locale = lang;
    await AsyncStorage.setItem(language, lang);
    console.log('[IS RTL]', I18nManager.isRTL);
    if (lang === 'ar') {
        if (!I18nManager.isRTL) {
            I18nManager.forceRTL(true);
            I18nManager.allowRTL(true);
            if (Platform.OS === 'ios') RNRestart.Restart();
        }
        if (restart) RNRestart.Restart();
    } else if (I18nManager.isRTL) {
        if (I18nManager.isRTL) {
            I18nManager.forceRTL(false);
            I18nManager.allowRTL(true);
        }
        if (restart) RNRestart.Restart();
    }
}
i18n.config = async (lang) => {
    i18n.translations = translations;
    i18n.fallbacks = true;
    await i18n.setLanguage(lang, false);
    i18n.start = I18nManager.isRTL ? 'right' : 'left';
    i18n.end = I18nManager.isRTL ? 'left' : 'right';
}


export { i18n };