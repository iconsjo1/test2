import React, {useEffect, useState, useRef} from 'react';
import {
  LoadingWrapper,
  DoctorListItem,
  Text,
  DateSelector,
  NetworkError,
  TouchableOpacity,
  NoResults,
} from '../../../../components';
import {View, TextInput, FlatList} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, i18n, appointmentReducersTypes} from '../../../../services';
import {useSelector, connect} from 'react-redux';
import {
  getDoctorsList,
  getAllDoctors,
  getAllDoctorsSchedule,
  getAllDoctorsDaysOff,
} from '../../../../store/actions';
import moment from 'moment';
import ids from '../../../../../ids';
import FilterModal from './FilterModal';
import {useDispatch} from 'react-redux';

const {SET_LOADER} = appointmentReducersTypes;

const SelectDoctor = ({
  navigation,
  getDoctorsList,
  route,
  getAllDoctors,
  header = true,
}) => {
  const {CODE, showFilter, forceSendRequest} = route.params;
  const [filter, setFilter] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [date, setDate] = useState(moment());
  const doctorsList = useRef();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.appointments.loading);
  0;
  const specialities = useSelector((state) => state.appointments.specialities);
  const doctors = useSelector((state) =>
    CODE ? state.appointments.doctors : state.appointments.allDoctors,
  );
  const allDoctors = useSelector((state) => state.appointments.allDoctors);
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  useEffect(() => {
    (async () => {
      const cbSuccess = async (docs) => {
        // setLoading(false);
        // console.log('docs', docs);
        if (docs) {
          setFilteredDoctors(docs);
          dispatch(
            getAllDoctorsSchedule( date.format('yyyy-MM-DD')),
          );
          dispatch(
            getAllDoctorsDaysOff(date.format('yyyy-MM-DD'))
          )
        }
      };
      const cbFailure = () => {
        // setLoading(false);
      };
      if (specialities && allDoctors) {
        if (CODE)
          getDoctorsList({CODE, forceSendRequest}, cbSuccess, cbFailure);
        return;
      }
      getAllDoctors(cbSuccess, cbFailure);
    })();
  }, []);

  const handleFilter = ({CODE: spec_code, SEX}) => {
    let filteredDoctorsArray = [...doctors];
    if (spec_code)
      filteredDoctorsArray = doctors.filter((el) =>
        el.DOC_CODE.includes(spec_code.trim()),
      );
    if (SEX)
      filteredDoctorsArray = filteredDoctorsArray.filter(
        (el) => el.SEX === SEX,
      );
    setFilteredDoctors(filteredDoctorsArray);
  };

  useEffect(() => {
    if (CODE && !showFilter) {
      setFilteredDoctors(doctors);
    }
  }, [doctors]);

  // console.log('filteredDoctors', filteredDoctors);
  return (
    <LoadingWrapper
      navigation={navigation}
      header
      endIcon={
        expandedIndex !== -1 ? (
          <TouchableOpacity
            onPress={() => {
              setExpandedIndex(-1);
              setDate(moment());
            }}
            style={styles().closeIcon}>
            <Icon name="close-circle" color={colors.grey} size={30} />
          </TouchableOpacity>
        ) : showFilter ? (
          <TouchableOpacity
            onPress={() => setShowFilterModal(true)}
            style={styles().filterIcon}>
            <Icon name="ios-funnel-outline" color={colors.black} size={15} />
          </TouchableOpacity>
        ) : null
      }
      headerText={
        header ? undefined : i18n.t('selectDoctorsTranslations.select')
      }
      loading={loading}>
      {expandedIndex === -1 ? (
        <View style={styles().innerContainer}>
          {/* <Text style={styles().stepText}>
                        {i18n.t('selectDoctorsTranslations.step')}
                    </Text> */}
          {header ? (
            <Text style={styles().selectText}>
              {i18n.t('selectDoctorsTranslations.select')}
            </Text>
          ) : null}
          {doctors ? (
            <View style={styles().searchContainer}>
              <Icon name="search" color={colors.grey} size={20} />
              <TextInput
                testID={ids.selectDoc.searchField}
                placeholderTextColor={colors.grey}
                onChangeText={(text) => {
                  setExpandedIndex(-1);
                  setFilter(text);
                }}
                placeholder={i18n.t('selectDoctorsTranslations.placeholder')}
                style={styles().searchInput}
              />
            </View>
          ) : null}
        </View>
      ) : (
        <DateSelector date={date} setDate={setDate} />
      )}
      {filteredDoctors ? (
        filteredDoctors.length !== 0 ? (
          <FlatList
            testID={ids.selectDoc.scrollContianer}
            showsVerticalScrollIndicator={false}
            keyExtractor={(el) => el.DOC_CODE}
            ref={(ref) => (doctorsList.current = ref)}
            renderItem={({item, index}) => (
              <DoctorListItem
                mainNav={showFilter}
                last={index === filteredDoctors.length - 1}
                first={index === 0}
                collapsed={index !== expandedIndex}
                collapse={() => setExpandedIndex(-1)}
                date={date}
                index={index}
                // availableAppointments={getAvailableAppointments(item)}
                scrollToIndex={(i) =>
                  doctorsList.current.scrollToIndex({index: i, animated: true})
                }
                expand={() => setExpandedIndex(index)}
                navigation={navigation}
                {...item}
              />
            )}
            data={filteredDoctors.filter(
              (el) =>
                el.CLINC_ENAME.includes(filter) ||
                el.CLINC_ENAME.includes(filter.toUpperCase()) ||
                el.CLINC_ENAME.includes(filter.toLowerCase()) ||
                el.CLINC_ANAME.includes(filter),
            )}
          />
        ) : (
          <NoResults text={i18n.t('selectDoctorsTranslations.NoResults')} />
        )
      ) : (
        <NetworkError />
      )}
      <FilterModal
        filter={handleFilter}
        show={showFilterModal}
        cancelFilter={() => setShowFilterModal(false)}
        categories={specialities}
        genders={[
          {E_NAME: 'Male', A_NAME: 'الذكر'},
          {E_NAME: 'Female', A_NAME: 'أنثى'},
        ]}
        setShow={setShowFilterModal}
      />
    </LoadingWrapper>
  );
};

export default connect(null, {
  getDoctorsList,
  getAllDoctors,
  getAllDoctorsSchedule,
  getAllDoctorsDaysOff,
})(SelectDoctor);
