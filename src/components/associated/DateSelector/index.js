/*
THIS COMPONENT IS DISPLAYED ON TOP OF THE DOCTORS LIST
WHEN A USER INTENDS TO MAKE AN APPOINTMENT WITH THE DOCTOR
*/

import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, FlatList, I18nManager, Platform } from 'react-native';
import ShadowView from 'react-native-simple-shadow-view';
import { shadows, colors, WP, getMonthName, fontFamilies, getDayName, getDatesArray, getNextDay, getPreviousDay, getNextMonth, getPreviousMonth } from '../../../services';
import { Text, TouchableOpacity } from '../..';
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from 'moment';
import ids from '../../../../ids';

const DateSelector = ({ date, setDate }) => {
    const days = getDatesArray(date);
    const listRef = useRef(undefined);

    const nextDayHandler = () => {
        if (Number(date.get('D')) >= days.length)
            listRef.current.scrollToIndex({
                index: I18nManager.isRTL && Platform.OS === 'ios' ? days.length - 1 - 0 : 0,
                animated: true
            });
        else
            listRef.current.scrollToIndex({
                index: I18nManager.isRTL && Platform.OS === 'ios' ? days.length - 1 - Number(date.get('D')) : Number(date.get('D')),
                animated: true
            });
        setDate(getNextDay(date));
    }
    const prevDayHandler = () => {
        if (new Date(date).getTime() > new Date().getTime()) {
            if (Number(date.get('D')) == 1)
                I18nManager.isRTL && Platform.OS === 'ios' ? listRef.current.scrollToIndex({ index: 0 }) : listRef.current.scrollToEnd();
            else
                listRef.current.scrollToIndex({
                    index: I18nManager.isRTL && Platform.OS === 'ios' ? days.length - Number(date.get('D') - 1) : Number(date.get('D')) - 2,
                    animated: true
                });
            setDate(getPreviousDay(date));
        }
    }
    const nextMonthHandler = () => {
        listRef.current.scrollToIndex({
            index: I18nManager.isRTL && Platform.OS === 'ios' ? days.length - 1 - 0 : 0,
            animated: true
        });
        setDate(getNextMonth(date).set('D', 1));
    }
    const prevMonthHandler = () => {
        // CHECK IF DATE IS LESS THAN THE TODAY
        if (Number(new Date(date).getTime()) < Number(new Date(moment()).getTime())) return;

        // IF NOT LESS THAN CURRENT MONTH, SET DATE TO ZERO AND SET MONTH TO ONE FIGURE BEFORE
        if (getPreviousMonth(date).get('M') !== moment().get('M')
            || Number(getPreviousMonth(date).get('year')) > Number(moment().get('year'))) {
            listRef.current.scrollToIndex({
                index: I18nManager.isRTL && Platform.OS === 'ios' ? days.length - 1 - 0 : 0,
                animated: true
            });
            setDate(getPreviousMonth(date).set('D', 1));
        }

        // THIS MEANS THE DATE IS OF CURRENT MONTH, IN THIS CASE SET DATE TO THE CURRENT DAY
        else {
            if (moment().get('D') < 5)
                listRef.current.scrollToIndex({
                    index: I18nManager.isRTL && Platform.OS === 'ios' ? days.length - 1 - 0 : 0,
                    animated: true
                });
            else
                listRef.current.scrollToIndex({
                    index: I18nManager.isRTL && Platform.OS === 'ios' ? days.length - 1 - Number(moment().get('D')) - 2 : Number(moment().get('D')) - 2,
                    animated: true
                });
            setDate(moment());
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if (Number(date.get('D')) < 5)
                listRef.current.scrollToIndex({
                    index: I18nManager.isRTL && Platform.OS === 'ios' ? days.length - 1 : 0,
                    animated: true
                });
            else
                listRef.current.scrollToIndex({
                    index: I18nManager.isRTL && Platform.OS === 'ios' ? days.length - Number(date.get('D')) : Number(date.get('D')) - 1,
                    animated: true
                });
        }, 500)
    }, []);

    return (
        <ShadowView style={[shadows.extraLightShadowGrey, styles().shadow]}>
            <View style={styles().rowContainer}>
                <TouchableOpacity onPress={prevMonthHandler} testID={ids.selectDoc.prevMonth} style={styles().arrows}>
                    <AntDesign name={!I18nManager.isRTL ? "arrowleft" : "arrowright"} color={colors.black} size={15} />
                </TouchableOpacity>
                <Text style={styles().monthyear}>
                    {getMonthName(date)} {date.year()}
                </Text>
                <TouchableOpacity onPress={nextMonthHandler} testID={ids.selectDoc.nextMonth} style={styles().arrows}>
                    <AntDesign name={!I18nManager.isRTL ? "arrowright" : "arrowleft"} color={colors.black} size={15} />
                </TouchableOpacity>
            </View>
            <View style={styles().rowContainer}>
                <TouchableOpacity style={styles().arrows}>
                    <AntDesign onPress={prevDayHandler} testID={ids.selectDoc.prevDay} name={I18nManager.isRTL ? "right" : "left"} color={colors.black} size={15} />
                </TouchableOpacity>
                <FlatList
                    testID={ids.selectDoc.dateScrollList}
                    data={days}
                    horizontal
                    ref={ref => listRef.current = ref}
                    maxToRenderPerBatch={35}
                    initialNumToRender={35}
                    onScrollToIndexFailed={() => {
                        console.log('[SCROLL TO INDEX FAILED]');
                        if (listRef.current)
                            setTimeout(() => {
                                listRef.current ?
                                    listRef.current.scrollToIndex({
                                        index: I18nManager.isRTL ?
                                            days.length - Number(date.get('D'))
                                            :
                                            Number(date.get('D')) - 2
                                    }) : null
                            }, 500)
                    }}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(el, i) => String(i)}
                    renderItem={({ item }) => {
                        const enabled = new Date(getNextDay(item)).getTime() > new Date().getTime();
                        return (
                            <TouchableOpacity
                                disabled={!enabled}
                                testID={"date--" + String(item.get('D'))}
                                onPress={() => {
                                    if (enabled)
                                        setDate(item);
                                }}
                                style={styles().dateContainer}>
                                <Text style={[
                                    styles().datetextStyleDay,
                                    { color: item.get('D') !== date.get('D') ? colors.grey : colors.skyBlue }
                                ]}>
                                    {getDayName(item)}
                                </Text>
                                <Text style={[
                                    styles().datetextStyle,
                                    { color: enabled ? item.get('D') !== date.get('D') ? colors.black : colors.skyBlue : colors.grey }
                                ]}>
                                    {item.get('D')}
                                </Text>
                            </TouchableOpacity>
                        )
                    }} />
                <TouchableOpacity testID={ids.selectDoc.nextDay} onPress={nextDayHandler} style={styles().arrows}>
                    <AntDesign name={I18nManager.isRTL ? "left" : "right"} color={colors.black} size={15} />
                </TouchableOpacity>
            </View>
        </ShadowView>
    )
}

export default DateSelector;


const styles = () => StyleSheet.create({
    shadow: {
        width: WP('95'),
        alignSelf: 'center',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: colors.whiteBg
    },
    rowContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    monthyear: {
        textAlign: 'center',
        fontFamily: fontFamilies('boldTextHeader'),
        fontSize: 16,
        textAlignVertical: 'center',
    },
    arrows: {
        padding: 10
    },
    dateContainer: {
        padding: 10,
        alignItems: 'center'
    },
    datetextStyleDay: {
        marginVertical: 5,
        textAlign: 'center'
    },
    datetextStyle: {
        marginVertical: 5,
        textAlign: 'center',
        fontFamily: fontFamilies('semiboldText')
    }
});
