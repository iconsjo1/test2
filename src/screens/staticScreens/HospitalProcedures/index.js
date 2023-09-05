import React from 'react'
import { LoadingWrapper, Text } from '../../../components'
import { ScrollView, SafeAreaView, View } from 'react-native';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, WP, shadows } from '../../../services';
import ShadowView from 'react-native-simple-shadow-view';

const iconSize = WP('20') < 100 ? WP('20') : 100;

const HospitalProcedures = ({ navigation, route }) => {
    const {
        data,
    } = route.params;

    return (
        <LoadingWrapper
            header
            navigation={navigation}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView>
                    <ShadowView style={[shadows.lightShadowGreyLowSpread, styles().shadowContainer]}>
                        <View style={styles().iconContainer}>
                            {data.iconDetail.container === 'MaterialCommunityIcons' ? <MaterialCommunityIcons name={data.iconDetail.name} color={colors.mediumGrey} size={iconSize} /> : null}
                            {data.iconDetail.container === 'Ionicons' ? <Ionicons name={data.iconDetail.name} color={colors.mediumGrey} size={iconSize} /> : null}
                        </View>
                        <Text style={styles().title}>
                            {data.TITLE}
                        </Text>
                        <Text style={styles().description}>
                            {data.DESCRIPTION}
                        </Text>
                    </ShadowView>
                </SafeAreaView>
            </ScrollView>
        </LoadingWrapper>
    )
}

export default HospitalProcedures
