
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, I18nManager, TouchableOpacity } from 'react-native';
import Text from '../../../../components/generic/Text'
import { colors, routesNames, shadows, WP, getDateMonthYear } from '../../../../services';
import Feather from 'react-native-vector-icons/Feather';
import ShadowView from 'react-native-simple-shadow-view';

const ReportItem = ({ data, navigation, first, last }) => {
    const showReportDetails = () => {
        navigation.navigate(routesNames.radiologyReportDetails, data)
    }
    return (
        <ShadowView style={StyleSheet.flatten([
            shadows.lightShadowGrey,
            styles().shadowStyle,
            {
                marginTop: first ? 20 : 10,
                marginBottom: last ? 30 : undefined
            }
        ])}>
            <TouchableOpacity onPress={showReportDetails}>
                <View style={{ paddingTop: 15, paddingLeft: 15, paddingRight: 15, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: colors.black }}>
                        {I18nManager.isRTL ? data.DOC_ANAME : data.DOC_ENAME}
                    </Text>
                    <Text style={{ color: colors.orange, fontSize: 12, fontWeight: '500' }}>
                        {getDateMonthYear(new Date(data.TRS_DATE).toDateString())}
                    </Text>
                </View>
                <View style={{ paddingLeft: 10, paddingTop: 10, paddingRight: 10 }}>
                    <Text style={{ color: colors.darkGrey, fontSize: 14, textAlign: 'left' }}>
                        {data.SERV_ENAME}
                    </Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Feather name='chevrons-down' size={15} color={colors.darkGrey} />
                </View>
            </TouchableOpacity>
        </ShadowView>

    )
}

export default ReportItem;

const styles = () => StyleSheet.create({

    shadowStyle: {
        backgroundColor: colors.white,
        width: WP('92'),
        alignSelf: 'center',
        marginBottom: 10,
        borderRadius: 8,
    }
})