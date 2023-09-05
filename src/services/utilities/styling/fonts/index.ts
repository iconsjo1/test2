import { i18n } from "../../.."

const _fontFamilies = {
    // APP NORMAL 'Quicksand-SemiBd',
    normalTextEn: 'Quicksand-Regular',
    normalTextAr: 'Almarai-Regular',
    lightTextEn: 'Quicksand-Light',
    lightTextAr: 'Almarai-Light',
    boldTextEn: 'Quicksand-Bold',
    boldTextAr: 'Almarai-Bold',
    semiboldTextEn: 'Quicksand-SemiBold',
    semiboldTextAr: 'Almarai-Regular',

    //APP HEADERS TEXT
    normalTextHeaderEn: 'Rubik-Regular',
    normalTextHeaderAr: 'Tajawal-Regular',
    lightTextHeaderEn: 'Rubik-Light',
    lightTextHeaderAr: 'Tajawal-Light',
    boldTextHeaderEn: 'Rubik-Medium',
    boldTextHeaderAr: 'Tajawal-Bold',
}

const _lineHeights = {
    normalAr: 16 + 12,
    smallAr: 16 + 4,
    smallEn: 16,
}

declare type fontFamiliesTypes =
    'normalText' |
    'lightText' |
    'boldText' |
    'semiboldText' |
    'normalTextHeader' |
    'lightTextHeader' |
    'boldTextHeader';

declare type lineHeightTypes = 'normal' | 'small';

export const fontFamilies = (family: fontFamiliesTypes) => _fontFamilies[family + (i18n.locale === 'ar' ? 'Ar' : 'En')]

export const lineHeights = (lineHeight: lineHeightTypes) => _lineHeights[lineHeight + (i18n.locale === 'ar' ? 'Ar' : 'En')]