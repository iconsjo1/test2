import React, { useState, useRef, useEffect } from 'react'

import { View, StyleSheet, Image, FlatList, Alert, I18nManager } from 'react-native';
import { LoadingWrapper } from '../../../components';
import { colors, images, routesNames, i18n, fontFamilies, WP, mobileNumber, setPhoneNumber } from '../../../services/index';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import { Text } from '../../../components';
import InputWithLabel from '../../../components/inputs/InputWithLabel';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import Item from './Item';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
const checkMarkSize = 50;
const PrivateCareService = ({ navigation }) => {
    // const [loading, setLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <LoadingWrapper navigation={navigation} loading={loading} header lightGreyBG={true}>
        <View style={styles().ReportFormWrapper}>
            <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
                <View style={styles().scrollViewContainer}>
                    <View>
                        <Text style={styles().titleStyle}>
                            {i18n.t('paymentTranslations.paymentTitle')}
                        </Text>
                    </View>
                    <View style={styles().cardContainer}>
                        <View style={styles().container}>
                            <View style={styles().buttonContainer}>
                                <Text style={styles().titleService}>
                                    <Image source={images.phoneHandle} style={styles().phoneImage} resizeMode='contain' />
                                    &nbsp;&nbsp;{i18n.t('paymentTranslations.servicePrice')}
                                </Text>
                            </View>
                            <View style={styles().buttonContainer}>
                                <Text style={styles().visitTitleStyle}>
                                    SAR 45/visit
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles().taxText}>
                                {i18n.t('paymentTranslations.taxInclude')}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles().promoText}>
                                {i18n.t('paymentTranslations.addPromoCode')}
                            </Text>
                        </View> 
                    </View>

                    <View style={styles().creditCard}>
                        <View style={{flex: 1, flexDirection: 'row',padding:1,flexWrap: "wrap",}}>
                            <View style={styles().creditcardcheck}>
                                <Icon
                                    style={styles().creditcardcheckContainer}
                                    name="credit-card-check"
                                    size={checkMarkSize}
                                    color={colors.white}
                                />
                            </View>
                            <View style={styles().creditContainer}>
                                <Image source={images.googlePay1} style={styles().googleImage} resizeMode='contain' />

                            </View>
                            <View style={styles().creditContainer}>
                                <Image source={images.apple} style={styles().googleImage} resizeMode='contain' />
                            </View>
                        </View> 

                        <View style={{flex: 1, flexDirection: 'row',padding:1,flexWrap: "wrap"}}>
                            <View style={styles().buttonContainer}>
                                <Text style={styles().titleStyleCard}>
                                    {i18n.t('paymentTranslations.creditCard')}
                                </Text>
                            </View>
                            <View style={styles().buttonContainer}>
                                <Text style={styles().titleStyleCard}>
                                    {i18n.t('paymentTranslations.googlePay')}
                                </Text>
                            </View>
                            <View style={styles().buttonContainer}>
                                <Text style={styles().titleStyleCard}>
                                    {i18n.t('paymentTranslations.applePay')}
                                </Text>
                            </View>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row',padding:1,flexWrap: "wrap",marginTop:30}}>
                            <View style={styles().buttonContainer}>
                                <View style={{flex: 1, flexDirection: 'row',padding:1,flexWrap: "wrap"}}>
                                    <View>
                                        <Image source={images.mastercard} style={styles().imageStyle} />
                                    </View>
                                    <View>
                                        <Text style={{fontFamily: fontFamilies('boldText'),fontSize:12}}>XXXX - XXXX - XXXX - 9078</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text style={styles().changeText}>
                                    Change
                                </Text>
                            </View> 
                            
                        </View>
                    </View>
                    <View style={{ height: 80 }} />
                    <PrimaryButton>
                        {i18n.t('paymentTranslations.payAndSendRequest')}
                        {submitIcon()}
                    </PrimaryButton>
                    <View style={{ height: 50 }} />
                </View>
            </KeyboardAvoidingScrollView>
        </View>
    </LoadingWrapper>
)
}

const submitIcon = () => {
console.log("submit")
}

export default PrivateCareService;

const styles = () => StyleSheet.create({
ReportFormWrapper: {
    flex: 1,
},
imageStyle: {
    // alignSelf: 'center',
    height:50,
    width:50,
    marginTop:-15
},
googleImage: {
    // alignSelf: 'center',
    height:50,
    width:50,
    marginTop:12,
    alignSelf:'center'
},
phoneImage:{
    height:30,
    width:30,
    // marginTop:12,
    alignSelf:'center',
    // margin:10

},

titleStyle: {
    color: colors.black,
    fontSize: 23,
    textAlign: 'left',
    fontFamily: fontFamilies('boldText'),
    marginTop: 30,
    marginBottom:30
},
titleService:{
    color: colors.black,
    fontSize: 14,
    textAlign: 'left',
    // fontFamily: fontFamilies('boldText'),
    marginTop: 10,
    // marginBottom:30
    height:50
},
titleStyleCard:{
    color: colors.black,
    fontSize: 13,
    textAlign: 'left',
    textAlign:'center'
    // fontFamily: fontFamilies('boldText'),
},
visitTitleStyle: {
    color: colors.black,
    fontSize: 17,
    textAlign: 'left',
    fontFamily: fontFamilies('boldText'),
    marginTop: 20,
    textAlign:'right'
},
taxText: {
    color: colors.grey,
    marginVertical: 5,
    fontSize: 13,
    textAlign: 'right',
},
promoText:{
    color: colors.primary,
    marginVertical: 5,
    fontSize: 14,
    textAlign: 'right',
    fontWeight:'bold'
},
changeText:{
    color: colors.skyBlueDark,
    // marginVertical: 5,
    fontSize: 14,
    textAlign: 'right',
    fontWeight:'bold',
    marginRight:20
},

bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
},
scrollViewContainer: {
    width: WP('92'),
    alignSelf: 'center'
},

cardContainer: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop:10,
    marginHorizontal: 5,
    shadowColor: "rgba(0,0,0, .4)",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5
},
creditCard: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop:2,
    marginHorizontal: 5,
    shadowColor: "rgba(0,0,0, .4)",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5
},
container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
},
buttonContainer: {
    flex: 1,
},
creditContainer: {
    flex: 1,
    borderColor: '#dddddd',
    borderWidth: 1,
    // marginBottom: 30,
    borderRadius:20,
    margin:3,
},
iconStyle:{
    textAlign:'center',
    margin:10
},

creditcardcheck: {
    flex: 1,
    borderColor: colors.primary,
    // borderWidth: 1,
    // marginBottom: 30,
    borderRadius:20,
    margin:3,
    backgroundColor:colors.primary
},
creditcardcheckContainer: {
    flex: 1,
    borderColor: '#dddddd',
    // borderWidth: 1,
    marginBottom: 30,
    borderRadius:20,
    margin:3,
    textAlign:'center',
    margin:10
},
})




