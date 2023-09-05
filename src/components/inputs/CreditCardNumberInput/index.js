import React, { useEffect, useRef } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';

import styles from './styles';
import ExpiryPicker from '../ExpiryPicker';
import { i18n, colors } from '../../../services';

const separator = Dimensions.get('window').width > 400 ? '  ' : ' ';

const CreditCardNumberInput = ({ cardNumber, cardExpiry, cardCVC, setCardNumber, setCardExpiry, setCardCVC }) => {
    const width1 = useRef(undefined);
    const cvcref = useRef();


    return (
        <>
            <View style={styles().wrapper}>
                <View style={styles().numebrInputContainer}>
                    <TextInput
                        placeholderTextColor={colors.lightGrey}
                        keyboardType='number-pad'
                        onLayout={e => { if (width1.current === undefined) width1.current = e.nativeEvent.layout.width }}
                        placeholder={'1234' + separator + '5678' + separator + '1234' + separator + '5678'}
                        style={[styles().numebrInput, { minWidth: width1.current ? width1.current : undefined }]}
                        onChangeText={text => setCardNumber(modifyCarNum(text, () => cvcref.current.focus()))}
                        value={cardNumber} />
                </View>
                <Text style={styles().inputTopLabel}>
                    {i18n.t('addCardTranslations.cardNum')}
                </Text>
            </View>
            <View style={styles().expNcvcContainer}>
                <View style={styles().halfOuterContainer}>
                    <View style={styles().wrapper}>

                        <View style={styles().halfWrapperInner}>
                            <ExpiryPicker
                                value={cardExpiry}
                                setValue={setCardExpiry}
                                label="Expiry" />
                        </View>
                        <Text style={styles().inputTopLabel}>
                            {i18n.t('addCardTranslations.expiry')}
                        </Text>
                    </View>
                </View>

                <View style={styles().halfOuterContainer}>
                    <View style={styles().wrapper}>
                        <View style={styles().halfWrapperInner}>
                            <TextInput
                                placeholderTextColor={colors.lightGrey}
                                maxLength={3}
                                ref={ref => cvcref.current = ref}
                                keyboardType='number-pad'
                                placeholder='123'
                                style={styles().cvcInput}
                                onChangeText={setCardCVC}
                                value={cardCVC} />
                        </View>
                        <Text style={styles().inputTopLabel}>
                            {i18n.t('addCardTranslations.cvv')}
                        </Text>
                    </View>
                </View>
            </View>
        </>
    )
}

export default CreditCardNumberInput;


const modifyCarNum = (num, focusToCVC) => {
    const numArray = num.split(separator).join('').split('');
    if (numArray.length > 16) focusToCVC();

    if (numArray.length > 16) {
        numArray.splice(16, numArray.length);
    }

    const newArray = [];
    for (let i = 0; i < numArray.length; i++) {
        newArray.push(numArray[i]);
        if ((i + 1) % 4 === 0 && (i !== numArray.length - 1)) newArray.push(separator);
    }
    return newArray.join('');
}