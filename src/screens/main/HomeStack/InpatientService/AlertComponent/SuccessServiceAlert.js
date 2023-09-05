import React, {useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {getAllInpatientRequests} from '../../../../../store/actions/main/inpatientServicesActions';
import {
  colors,
  fontFamilies,
  i18n,
  images,
  routesNames,
} from '../../../../../services';

const SuccessServiceAlert = ({route, navigation}) => {
  const patientRelsFirst = route.params?.patientRelsFirst;
  const successRate = route.params?.successRate;

  const inpatient = route.params?.inpatient;
  const setLoading = route.params?.setLoading;
  const setOpenRequests = route.params?.setOpenRequests;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllInpatientRequests(
        inpatient?.ADMISSIONNO,
        (data) => {
          setLoading(false);
          setOpenRequests(data);
        },
        () => {
          setLoading(false);
        },
        0,
      ),
    );
  });

  return (
    <>
      <View style={styles().container}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}
          style={styles().dismiss}></TouchableOpacity>
      </View>
      <View
        style={{
          ...styles().alertContainer,
          top: successRate
            ? Dimensions.get('screen').height / 4.7
            : patientRelsFirst
            ? Dimensions.get('screen').height / 3.9
            : Dimensions.get('screen').height / 3.4,
        }}>
        {successRate ? (
          <>
            <Image source={images.imgSuccess} style={styles().img} />
            <Text style={styles().txt}>
              {i18n.t('inpatientAlertSuccess.rateThanks')}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                width: '80%',
                backgroundColor: colors.skyBlue,
                padding: 15,
                paddingHorizontal: 40,
                borderRadius: 10,
                marginVertical: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.whiteAbsolute,
                  fontFamily: fontFamilies('semiboldText'),
                  fontSize: 14,
                }}>
                {i18n.t('inpatientAlertSuccess.done')}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles().heading}>
              {i18n.t('inpatientAlertSuccess.wellDone')}
            </Text>
            <Text style={styles().subHeading}>
              {i18n.t('inpatientAlertSuccess.msg')}
            </Text>

            <View style={styles().btnFlex}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(routesNames.inpatientService, {
                    selectedTab: 1,
                    dummy: Math.random(),
                  });
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: Dimensions.get('screen').width / 1.1,
                }}>
                <Text
                  style={{
                    color: colors.skyBlue,
                    fontFamily: fontFamilies('normalTextHeader'),
                    fontSize: 14,
                    marginTop: 10,
                  }}>
                  {i18n.t('inpatientAlertSuccess.myRequest')}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                backgroundColor: colors.grey,
                height: 1,
              }}></View>
            <View style={styles().btnFlex}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(routesNames.inpatientService)
                }
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: Dimensions.get('screen').width / 2 - 30,
                }}>
                <Text
                  style={{
                    color: colors.red,
                    fontFamily: fontFamilies('normalTextHeader'),
                    fontSize: 14,
                  }}>
                  {i18n.t('inpatientAlertSuccess.done')}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default SuccessServiceAlert;

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: colors.black,
      opacity: 0.5,
      zIndex: 1,
    },
    dismiss: {
      width: Dimensions.get('screen').width,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    alertContainer: {
      marginHorizontal: 20,
      backgroundColor: colors.greyishWhite,
      zIndex: 2,
      position: 'absolute',
      width: Dimensions.get('screen').width - 40,
      top: '45%%',
      borderRadius: 10,
      alignItems: 'center',
    },
    heading: {
      fontFamily: fontFamilies('normalTextHeader'),
      fontSize: 18,
      marginVertical: 10,
      marginTop: 20,
      color: colors.black,
    },
    subHeading: {
      fontFamily: fontFamilies('normalText'),
      textAlign: 'center',
      paddingHorizontal: 20,
      color: colors.mediumGrey,
    },
    actionBtns: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      borderTopColor: colors.lightGrey,
      borderTopWidth: 2,
      marginTop: 20,
      flexWrap: 'wrap',
    },
    btnFlex: {
      flex: 1,
      marginHorizontal: 5,
      alignItems: 'center',
      padding: 20,
    },
    img: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
      marginVertical: 20,
    },
    txt: {
      textAlign: 'center',
      fontFamily: fontFamilies('normalTextHeader'),
      fontSize: 16,
      color: colors.grey,
      marginHorizontal: 20,
    },
  });
