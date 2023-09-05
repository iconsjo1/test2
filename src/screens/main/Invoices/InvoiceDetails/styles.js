import {StyleSheet} from 'react-native';
import {colors, fontFamilies, i18n, shadows} from '../../../../services';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    invoiceList: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    invoice: {
      backgroundColor: colors.white,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.15,
      shadowRadius: 9.35,
      elevation: 5,
      borderRadius: 10,
    },
    invoiceInnerContainer: {
      flexDirection: 'row',
    },
    invoiceImageContainer: {
      backgroundColor: colors.red,
      padding: 20,
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    invoiceImage: {
      width: 60,
      height: 60,
      resizeMode: 'contain',
    },
    invoiceHeading: {
      fontFamily: fontFamilies('boldTextHeader'),
      fontSize: 14,
      color: colors.black,
    },
    invoiceDetails: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      flex: 1,
    },
    invoiceDetailsIcons: {
      flexDirection: 'row',
      marginTop: 10,
    },
    invoiceIconContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    invoiceIcon: {
      width: 15,
      height: 15,
      resizeMode: 'contain',
      marginRight: 5,
    },
    iconTxtColor: {
      color: colors.black,
      fontFamily: fontFamilies('semiboldText'),
    },
    expandIcon: {
      // marginLeft: 40,
    },
    fullInvoice: {},
    invoiceSummary: {
      backgroundColor: colors.white,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.15,
      shadowRadius: 9.35,
      elevation: 5,
      borderRadius: 10,
      padding: 10,
      zIndex: -1,
    },
    summaryHeader: {
      alignItems: 'center',
    },
    summaryHeaderImage: {
      width: 80,
      height: 80,
      resizeMode: 'contain',
      marginVertical: 10,
    },
    summaryHeaderText: {
      fontFamily: fontFamilies('boldTextHeader'),
      fontSize: 16,
      color: colors.skyBlue,
    },
    summaryDetails: {
      marginTop: 5,
      padding: 10,
    },
    summaryHeading: {
      fontFamily: fontFamilies('normalTextHeader'),
      fontSize: 14,
      alignSelf: 'center',
      marginTop: 10,
      color: colors.darkGrey,
    },
    detailHeading: {
      fontFamily: fontFamilies('boldText'),
      fontSize: 14,
      color: colors.black,
      maxWidth: 125,
    },
    detailSubHeading: {
      color: colors.grey,
      marginTop: 5,
      fontSize: 12,
      maxWidth: 150,
      fontFamily: fontFamilies('semiboldText'),
    },
    rowData: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 5,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    backBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      padding: 5,
      borderColor: colors.grey,
      borderWidth: 1,
      borderRadius: 10,
    },
    headerTxt: {
      alignSelf: 'center',
      fontSize: 18,
      color: colors.black,
      fontFamily: fontFamilies('normalText'),
    },
  });
