import React from 'react'
import ShadowView from 'react-native-simple-shadow-view';
import { shadows } from '../../../services';
import { StyleSheet } from 'react-native';

const ShadowWrapper = ({ style, children }) => {
    return (
        <ShadowView style={[shadows.lightShadow, style]}>
            {children}
        </ShadowView>
    )
}

export default ShadowWrapper;
