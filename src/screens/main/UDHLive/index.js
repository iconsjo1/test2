import React from 'react'
import { LoadingWrapper, Text } from '../../../components';
import { View, Image } from 'react-native';
import styles from './styles';
import { images, i18n } from '../../../services';

const UDHLive = ({ navigation }) => {
    return (
        <LoadingWrapper
            header
            navigation={navigation}>
            <View style={styles().contianer}>
                <Image
                    style={styles().comingSoonImage}
                    source={images.stethoscope} />
                <Text>
                    {i18n.t('udhLiveTabTranslations.comingSoon')}
                </Text>
            </View>
        </LoadingWrapper>
    )
}

export default UDHLive;
