import React from 'react';
import DatePicker from 'react-native-datepicker';
import { fontFamilies, i18n, colors } from '../../services'

const ExpiryPicker = ({ value, setValue }) => {
    return (
        <DatePicker
            mode='date'
            date={value}
            format='MM-YYYY'
            minDate={`${new Date().getMonth() + 1}-${new Date().getFullYear()}`}
            maxDate={`01-${new Date().getFullYear() + 10}`}
            confirmBtnText={i18n.t('addCardTranslations.condirm')}
            cancelBtnText={i18n.t('addCardTranslations.cancel')}
            style={{ width: '100%', padding: 5 }}
            showIcon={false}
            customStyles={{
                dateInput: {
                    borderWidth: 0
                },
                dateText: {
                    fontFamily: fontFamilies('normalText'),
                    fontWeight: 'normal',
                    color: colors.grey,
                    fontSize: 18,
                    width: '90%',
                    textAlign: 'center'
                },
                placeholderText: {
                    fontFamily: fontFamilies('normalText'),
                    fontWeight: 'normal',
                    color: colors.lightGrey,
                    fontSize: 18,
                    width: '90%',
                    textAlign: 'center'
                }
            }}
            onDateChange={setValue} />
    )
}

export default ExpiryPicker;