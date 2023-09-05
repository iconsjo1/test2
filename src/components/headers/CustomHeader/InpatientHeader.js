import React from 'react';
import {StyleSheet, Text, View, I18nManager, Dimensions} from 'react-native';
import {i18n, colors, fontFamilies} from '../../../services';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import {converENDigitsToAr} from '../../../services/utilities/helpers';
import {smallScreens} from '../../../services/utilities/responsive';
import moment from 'moment';
const InpatientHeader = ({inpatient}) => {
  return (
    <View style={styles().header}>
      <View style={styles().headerDetails}>
        <View style={{marginBottom: 5}}>
          <Text numberOfLines={1} style={styles().headerName}>
            {`${i18n.t('inpatientDetailsTranslation.hi')} ${
              inpatient.CUSTOMER_GIVEN_NAME
            },`}
          </Text>
        </View>
        <Detail
          detailName={i18n.t('inpatientDetailsTranslation.room')}
          detailValue={
            I18nManager.isRTL
              ? converENDigitsToAr(inpatient.ADMISSIONROOM.trim())
              : inpatient.ADMISSIONROOM.trim()
          }
          icon="meeting-room"
        />
      </View>

      <View style={styles().headerDetails}>
        <Detail
          detailName={i18n.t('inpatientDetailsTranslation.docName')}
          detailValue={`${inpatient.DOCTOR_GIVEN_NAME}`}
          icon="doctor"
          maxWidth={Dimensions.get('screen').width / 4.2}
        />
        <Detail
          detailName={i18n.t('inpatientDetailsTranslation.adDate')}
          detailValue={
            I18nManager.isRTL
              ? converENDigitsToAr(
                  moment(inpatient.ADMISSIONDATETIME).format('yyyy/MM/DD'),
                )
              : moment(inpatient.ADMISSIONDATETIME).format('l')
          }
          icon="calendar"
        />
      </View>
    </View>
  );
};

export default InpatientHeader;

const styles = () =>
  StyleSheet.create({
    header: {
      paddingHorizontal: smallScreens ? 10 : 20,
      paddingVertical: 10,
      backgroundColor: colors.skyBlue,
    },
    headerName: {
      fontFamily: fontFamilies('boldText'),
      color: colors.whiteAbsolute,
      fontSize: 12,
      alignSelf: I18nManager.isRTL ? 'flex-start' : 'flex-start',
      maxWidth: Dimensions.get('screen').width - 140,
    },
    headerDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 5,
      alignItems: 'flex-end',
    },
    detailTxt: {
      fontFamily: fontFamilies('semiboldText'),
      color: colors.whiteAbsolute,
      marginRight: 3,
      fontSize: I18nManager.isRTL ? 11 : 10,
    },
    detailTxtBold: {
      fontFamily: fontFamilies('boldText'),
      fontSize: smallScreens ? 9 : 11,
      color: colors.whiteAbsolute,
      maxWidth: Dimensions.get('screen').width - 200,
    },
    mainIcons: {
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
  });

const Detail = ({detailName, detailValue, icon, maxWidth, custom}) =>
  custom ? (
    <View style={styles().row}>
      <View>
        {icon === 'meeting-room' ? (
          <IconMat
            size={21}
            name={icon}
            color={colors.whiteAbsolute}
            style={{
              marginRight: 2,
            }}
          />
        ) : (
          <Icon
            size={21}
            name={icon}
            color={colors.whiteAbsolute}
            style={{
              marginRight: 5,
            }}
          />
        )}
      </View>
      <View>
        <Text style={styles().detailTxt}>{detailName}:</Text>
        <Text
          numberOfLines={1}
          style={
            (styles().detailTxtBold,
            maxWidth
              ? {...styles().detailTxtBold, maxWidth}
              : styles().detailTxtBold)
          }>
          {detailValue}
        </Text>
      </View>
    </View>
  ) : (
    <View style={styles().row}>
      {icon === 'meeting-room' ? (
        <IconMat
          size={20}
          name={icon}
          color={colors.whiteAbsolute}
          style={{
            marginRight: 2,
          }}
        />
      ) : (
        <Icon
          size={20}
          name={icon}
          color={colors.whiteAbsolute}
          style={{
            marginRight: 2,
          }}
        />
      )}

      <View style={styles().row}>
        <Text style={styles().detailTxt}>{detailName}:</Text>
        <Text
          numberOfLines={1}
          style={
            (styles().detailTxtBold,
            maxWidth
              ? {...styles().detailTxtBold, maxWidth}
              : styles().detailTxtBold)
          }>
          {detailValue}
        </Text>
      </View>
    </View>
  );
