import React, { useEffect, useState } from 'react'
import { LoadingWrapper, SpecialitySelector, Text, NetworkError } from '../../../../components';
import { View, ScrollView, TextInput, FlatList } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, i18n, routesNames } from '../../../../services';
import { useSelector, connect } from 'react-redux';
import { getAllSpecialities } from '../../../../store/actions';
import ids from '../../../../../ids';

const SpecialitySelect = ({ navigation, getAllSpecialities, header = true }) => {
    const [filter, setFilter] = useState('');
    const loading = useSelector(state => state.appointments.loading);
    const specialities = useSelector(state => state.appointments.specialities);

    return (
        <LoadingWrapper
            navigation={navigation}
            header={header}
            headerText={i18n.t('selectSpecialityTranslations.select')}
            loading={loading}>
            <View style={styles().innerContainer}>
                {/* <Text style={styles().stepText}>
                    {i18n.t('selectSpecialityTranslations.step')}
                </Text> */}
                {/* <Text style={styles().selectText}>
                    {i18n.t('selectSpecialityTranslations.select')}
                </Text> */}
                {specialities ?
                    <View style={styles().searchContainer}>
                        <Icon name="search" color={colors.grey} size={20} />
                        <TextInput
                            testID={ids.selectSpeciality.searchField}
                            onChangeText={setFilter}
                            placeholderTextColor={colors.grey}
                            placeholder={i18n.t('selectSpecialityTranslations.placeholder')}
                            style={styles().searchInput} />
                    </View>
                    : null}
            </View>
            {specialities ?
                <FlatList
                    testID={ids.selectSpeciality.scrollContianer}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={el => el.CODE}
                    initialNumToRender={20}
                    renderItem={({ item }) => (
                        <SpecialitySelector
                            testID={item.CODE}
                            onPress={() => navigation.navigate(routesNames.selectDoctor, { ...item, forceSendRequest: true })}
                            {...item} />
                    )}
                    data={specialities.filter(el => (
                        el.E_NAME.includes(filter)
                        ||
                        el.E_NAME.includes(filter.toUpperCase())
                        ||
                        el.E_NAME.includes(filter.toLowerCase())
                        ||
                        el.A_NAME.includes(filter)))} />
                :
                <NetworkError />
            }
        </LoadingWrapper>
    )
}

export default connect(null, { getAllSpecialities })(SpecialitySelect);
