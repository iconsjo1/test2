import React from 'react'
import { StyleSheet, View, Image } from 'react-native';
import Text from '../Text';
import { WP, images } from '../../../services';

const NoResults = ({ text }) => {
    return (
        <View style={styles().noReportsContainer}>
            <Image
                style={styles().noSearchResult}
                source={images.notFound}
                resizeMode='contain' />
            <Text style={{ textAlign: 'center' }}>
                {text}
            </Text>
        </View>
    )
}

export default NoResults;

const styles = () => StyleSheet.create({
    noReportsContainer: {
        flex: 1,
        padding: WP('20'),
        alignItems: 'center'
    },
    noSearchResult: {
        width: WP('50'),
        height: WP('50'),
        maxWidth: 200,
        maxHeight: 200,
        marginVertical: 30
    }
})