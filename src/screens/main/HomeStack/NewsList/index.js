import React, { useState } from 'react'
import { LoadingWrapper, Text, TouchableOpacity } from '../../../../components';
import styles from './styles';
import { colors, shadows, routesNames, i18n } from '../../../../services';
import { View, TextInput, FlatList, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ShadowView from 'react-native-simple-shadow-view';

const NewsList = ({ navigation, route }) => {
    const {
        news
    } = route.params;
    const [filter, setFilter] = useState('');

    return (
        <LoadingWrapper
            header
            navigation={navigation}>
            <View style={styles().searchContainer}>
                <View style={styles().searchContainerInner}>
                    <Icon name="search" color={colors.grey} size={20} />
                    <TextInput
                        placeholderTextColor={colors.grey}
                        onChangeText={(text) => {
                            setFilter(text);
                        }}
                        value={filter}
                        placeholder={i18n.t('newsListTranslations.search')}
                        style={styles().searchInput} />
                </View>
                <TouchableOpacity onPress={() => setFilter('')}>
                    <Text style={styles().cancelText}>
                        {i18n.t('newsListTranslations.cacnel')}
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles().listScroller}
                keyExtractor={(el, i) => String(i)}
                renderItem={({ item, index }) => (
                    <>
                        <TouchableOpacity
                            onPress={() => navigation.navigate(routesNames.newsDetails, { news: item, thumbnail: item.thumbnail })}
                            style={styles().newsItemContainer}>
                            <ShadowView style={StyleSheet.flatten([
                                shadows.lightShadowBlack,
                                styles().shadowContainer
                            ])}>
                                <View style={[styles().shadowContainer, { overflow: 'hidden' }]}>
                                    <Image
                                        resizeMode='cover'
                                        style={styles().thumbnail}
                                        source={{ uri: item.thumbnail }} />

                                    <Text style={styles().newsTitle}>
                                        {item.post_title}
                                    </Text>
                                    <Text numberOfLines={3} style={styles().newsDesc}>
                                        {item.post_excerpt}
                                    </Text>
                                    <Text style={styles().seeMore}>
                                        {i18n.t('newsListTranslations.seeMore')}
                                    </Text>
                                </View>
                            </ShadowView>
                        </TouchableOpacity>
                        {index === news.length - 1 ? <View style={{ height: 50 }} /> : null}
                    </>
                )}
                data={news.filter(el => {
                    if (el.post_title.includes(filter)
                        ||
                        el.post_excerpt.includes(filter)
                        ||
                        el.post_title.includes(String(filter).toUpperCase())
                        ||
                        el.post_excerpt.includes(String(filter).toUpperCase())
                        ||
                        el.post_title.includes(String(filter).toLowerCase())
                        ||
                        el.post_excerpt.includes(String(filter).toLowerCase()))
                        return true;
                    else return false;
                })} />
        </LoadingWrapper>
    )
}

export default NewsList;
