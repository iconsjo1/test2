import React from 'react'
import { View, StyleSheet, Image } from 'react-native';
import { WP, images, i18n } from '../../../services';
import Text from '../Text';

const NetworkError = () => {
    return (
        <View style={styles().container}>
            <View style={styles().imageContainer}>
                <Image resizeMode='contain' style={styles().image} source={images.noInternet} />
            </View>
            <Text style={styles().text}>
                {i18n.t('genericTranslations.offline')}
            </Text>
        </View>
    );
}

export default NetworkError;

const styles = () => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: WP('80'),
        height: WP('80') * 3 / 4,
        borderRadius: 15,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    text: {
        paddingHorizontal: WP('10'),
        paddingVertical: 10,
        width: '100%',
        textAlign: 'center'
    }
})