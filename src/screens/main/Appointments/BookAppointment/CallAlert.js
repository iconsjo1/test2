import React, { useState } from 'react'
import Modal from 'react-native-modal';
import { View } from 'react-native';
import { Text, PrimaryButton, HollowButton } from '../../../../components';
import styles from './styles';
import { colors, i18n } from '../../../../services';

const CallAlert = () => {
    const [show, setShow] = useState(true);

    return (
        <Modal
            animationIn='fadeIn'
            animationOut='fadeOut'
            useNativeDriver
            onBackdropPress={() => setShow(false)}
            backdropColor={colors.modalBackDrop}
            isVisible={show}>
            <View style={styles().callAlert}>
                <Text style={styles().callAlerttextStyle}>
                    {i18n.t('bookAppointmentTranslations.callText')}
                </Text>
                <PrimaryButton onPress={() => setShow(false)}>
                    {i18n.t('bookAppointmentTranslations.close')}
                </PrimaryButton>
            </View>
        </Modal>
    )
}

export default CallAlert;
