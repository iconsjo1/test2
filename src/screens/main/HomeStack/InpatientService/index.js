import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  I18nManager,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';

import styles from './styles';
import AuthHeader from '../../../../components/headers/CustomHeader/AuthHeader';
import LoadingWrapper from '../../../../components/generic/LoadingWrapper';
import {
  colors,
  fontFamilies,
  i18n,
  images,
  routesNames,
} from '../../../../services';
import IconCard from '../HomeLoggedinUser/IconCard';
import AlertComponent from './AlertComponent/AlertComponent';
import Order from './OrderComponent';
import {
  getAllInpatientRequests,
  orderService,
} from '../../../../store/actions/main/inpatientServicesActions';
import {useDispatch} from 'react-redux';
import {FlatList} from 'react-native';
import {converENDigitsToAr} from '../../../../services/utilities/helpers';
import InpatientHeader from '../../../../components/headers/CustomHeader/InpatientHeader';

const tabs = [
  {
    name: I18nManager.isRTL ? 'الخدمات' : 'Services',
  },
  {
    name: I18nManager.isRTL ? 'طلباتي' : 'My Requests',
  },
];

const InpatientService = ({route, navigation}) => {
  const [selected, setSelected] = useState(0);
  const [openRequest, setOpenRequests] = useState(null);
  const [loading, setLoading] = useState(false);
  const {inpatient, selectedTab, dummy} = route.params;
  // console.log(dummy);

  const openCleaningService = openRequest?.filter((req) => req.TYPE === '01');
  const openPatientRelationService = openRequest?.filter(
    (req) => req.TYPE === '02',
  );
  const openDoctorService = openRequest?.filter((req) => req.TYPE === '03');
  const openMaintenanceService = openRequest?.filter(
    (req) => req.TYPE === '04',
  );
  const openDutyManagerService = openRequest?.filter(
    (req) => req.TYPE === '05',
  );
  const openRequestBabyService = openRequest?.filter(
    (req) => req.TYPE === '06',
  );
  const openPullBabyService = openRequest?.filter((req) => req.TYPE === '07');
  const openMedicalReport = openRequest?.filter((req) => req.TYPE === '08');
  const openAttendantReport = openRequest?.filter((req) => req.TYPE === '09');

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    setSelected(dummy ? 1 : 0);
  }, [dummy]);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getAllInpatientRequests(
        inpatient.ADMISSIONNO,
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
  }, [selected, isFocused]);

  const handleRefresh = () => {
    setLoading(true);
    dispatch(
      getAllInpatientRequests(
        inpatient.ADMISSIONNO,
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
  };

  return (
    <LoadingWrapper>
      <View style={styles().container}>
        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
          <AuthHeader
            navigation={navigation}
            children={i18n.t('inpatientDetailsTranslation.inpatient')}
          />
        </View>
        <InpatientHeader inpatient={inpatient} />
        <View style={styles().tabsContainer}>
          {tabs.map((tab, index) =>
            selected === index ? (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelected(index);
                }}
                activeOpacity={1}
                style={styles().activeTab}>
                <Text
                  style={{
                    color: colors.whiteAbsolute,
                    fontSize: 12,
                    fontFamily: fontFamilies('boldText'),
                  }}>
                  {tab.name}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelected(index);
                }}
                activeOpacity={1}
                style={styles().inActiveTab}>
                <Text
                  style={{
                    color: colors.skyBlue,
                    fontSize: 12,
                    fontFamily: fontFamilies('boldText'),
                  }}>
                  {tab.name}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>
        {selected === 0 ? (
          <ScrollView>
            <View style={styles().mainIcons}>
              <IconCard
                icon={images.baby}
                name={i18n.t('inpatientOrder.requestBaby')}
                navigation={navigation}
                link={routesNames.alert}
                param={{
                  requestBaby: true,
                  inpatient,
                  serviceId: '06',
                  openService: openRequestBabyService,
                  setLoading,
                  setOpenRequests,
                }}
              />
              <IconCard
                icon={images.baby}
                name={i18n.t('inpatientOrder.pullBaby')}
                navigation={navigation}
                link={routesNames.alert}
                param={{
                  pullBaby: true,
                  inpatient,
                  serviceId: '07',
                  openService: openPullBabyService,
                  setLoading,
                  setOpenRequests,
                }}
              />
              <IconCard
                icon={images.patientRelationsPrimary}
                name={i18n.t('inpatientDetailsTranslation.patientRels')}
                navigation={navigation}
                link={routesNames.alert}
                param={{
                  patientRels: true,
                  inpatient,
                  serviceId: '02',
                  openService: openPatientRelationService,
                  setLoading,
                  setOpenRequests,
                }}
              />
              <IconCard
                icon={images.cleaningPrimary}
                name={i18n.t('inpatientDetailsTranslation.cleaningSer')}
                navigation={navigation}
                link={routesNames.alert}
                param={{
                  cleaningService: true,
                  inpatient,
                  serviceId: '01',
                  openService: openCleaningService,
                  setLoading,
                  setOpenRequests,
                }}
              />
              <IconCard
                icon={images.doctorRequestPrimary}
                name={i18n.t('inpatientOrder.doctorReq')}
                navigation={navigation}
                link={routesNames.alert}
                param={{
                  doctorReq: true,
                  inpatient,
                  serviceId: '03',
                  openService: openDoctorService,
                  setLoading,
                  setOpenRequests,
                }}
              />
              <IconCard
                icon={images.mintanacePrimary}
                name={i18n.t('inpatientOrder.maintenance')}
                navigation={navigation}
                link={routesNames.alert}
                param={{
                  maintenance: true,
                  inpatient,
                  serviceId: '04',
                  openService: openMaintenanceService,
                  setLoading,
                  setOpenRequests,
                }}
              />
              <IconCard
                icon={images.dutyManagerPrimary}
                name={i18n.t('inpatientOrder.dutyManage')}
                navigation={navigation}
                link={routesNames.alert}
                param={{
                  dutyManager: true,
                  inpatient,
                  serviceId: '05',
                  openService: openDutyManagerService,
                  setLoading,
                  setOpenRequests,
                }}
              />
              <IconCard
                icon={images.reqReport}
                name={i18n.t('inpatientDetailsTranslation.reportRequest')}
                navigation={navigation}
                link={routesNames.alert}
                param={{
                  requestReport: true,
                  inpatient,
                  serviceId: '08',
                  openService: openMedicalReport,
                  setLoading,
                  setOpenRequests,
                }}
              />
              <IconCard
                icon={images.reqCompanionRep}
                name={i18n.t(
                  'inpatientDetailsTranslation.reportCompanionRequest',
                )}
                navigation={navigation}
                link={routesNames.alert}
                param={{
                  requestAttendantReport: true,
                  inpatient,
                  serviceId: '09',
                  openService: openAttendantReport,
                  setLoading,
                  setOpenRequests,
                }}
              />
              <IconCard
                // isPrimary 
                icon={images.gallery}
                gallery
                name={i18n.t('inpatientDetailsTranslation.gallery')}
                navigation={navigation}
                link={routesNames.Images}
              />
              <IconCard
                icon={images.restaurantService}
                name={i18n.t('inpatientDetailsTranslation.restaurant')}
                navigation={navigation}
                link={routesNames.restaurantService}
                param={{inpatient}}
              />
               <IconCard
                icon={images.gift}
                name={i18n.t('inpatientDetailsTranslation.flower')}
                navigation={navigation}
                link={routesNames.flowerService}
                param={{inpatient}}
              />  
              <IconCard
                icon={images.rate}
                name={i18n.t('inpatientDetailsTranslation.rate')}
                navigation={navigation}
                link={routesNames.rateOurServices}
                param={{inpatient}}
              />
            </View>
          </ScrollView>
        ) : (
          <View style={{flex: 1}}>
            {loading ? (
              <ActivityIndicator size="large" color={colors.skyBlue} />
            ) : (
              <View>
                <FlatList
                  refreshing={loading}
                  onRefresh={handleRefresh}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: 50,
                  }}
                  ListEmptyComponent={() => (
                    <View
                      style={{
                        flex: 1,
                        marginTop: 50,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={images.notFound}
                        style={{width: 100, height: 100}}
                      />
                      <Text>
                        {I18nManager.isRTL
                          ? 'لا يوجد طلبات'
                          : 'You have no requests'}
                      </Text>
                    </View>
                  )}
                  data={openRequest}
                  keyExtractor={(item, index) => String(index)}
                  renderItem={({item, index}) => (
                    <Order
                      handleRefresh={handleRefresh}
                      order={item}
                      setSelected={setSelected}
                    />
                  )}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </LoadingWrapper>
  );
};

export default InpatientService;

export const Detail = ({detailName, detailValue, icon}) => (
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
      <Text style={styles().detailTxtBold}>{detailValue}</Text>
    </View>
  </View>
);
