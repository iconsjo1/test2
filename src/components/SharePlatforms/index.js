import React from 'react';
import { Text, TouchableOpacity, Image, View, Modal, StyleSheet } from 'react-native';
import {
    images, WP,
} from '../../services';
const SharePlatforms = ({ ModalVisible, Visible, SetConfig }) => (
    <Modal
        transparent={true}
        animationType="slide"
        visible={ModalVisible}
    >
        <View style={styles.transparentView}>
        </View>
        <View style={styles.MainView}>
            <View style={{ height: 10 }} />

            <View transparent style={[styles.FoucsView]}  >
                <TouchableOpacity onPress={() => SetConfig('FACEBOOK')}>
                    <Image source={images.facebook} style={styles.img} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => SetConfig('WHATSAPP')}>
                    <Image source={images.whatsapp} style={styles.img} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => SetConfig('TWITTER')}>
                    <Image source={images.twitter} style={styles.img} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => SetConfig('TELEGRAM')}>
                    <Image source={images.telegram} style={styles.img} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => SetConfig('LINKEDIN')}>
                    <Image source={images.linkedin} style={styles.img} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => SetConfig('PINTEREST')}>
                    <Image source={images.pinterest} style={styles.img} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => SetConfig('WHATSAPPBUSINESS')}>
                    <Image source={images.whatsBs} style={styles.img} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => SetConfig('GOOGLEPLUS')}>
                    <Image source={images.googleplus} style={styles.img} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => SetConfig('INSTAGRAM')}>
                    <Image source={images.instagram} style={styles.img} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => SetConfig('EMAIL')}>
                    <Image source={images.gmail} style={styles.img} />
                </TouchableOpacity>
            </View>
            {/* <TouchableOpacity transparent style={[styles.FoucsView, { backgroundColor: '#38acff' }]} onPress={() => {
                SetConfig(7, 100, 50, 15, 120, 120), Visible()
            }}>
                <Text style={[styles.Text]}>120p</Text>
            </TouchableOpacity> */}
            <TouchableOpacity transparent style={styles.close} onPress={() => { Visible() }}>
                <Text style={[styles.Text]}>{'close'}</Text>
            </TouchableOpacity>
            <View style={{ height: 10 }} />
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    transparentView: { backgroundColor: '#000', opacity: 0.6, width: '100%', height: '100%' },
    MainView: {
        width: '95%', position: 'absolute', margin: 40, backgroundColor: '#fff',
        justifyContent: 'center', alignSelf: 'center', borderRadius: 10,
        top: '5%'
    },
    img: {
        width: WP(15), height: WP(12), margin: 20, resizeMode: "contain"
    },
    TextNotFoucs: {
        fontSize: 14, marginHorizontal: 10,
        fontFamily: 'careem', alignSelf: 'center', textAlign: 'center',
        color: "#eca67b"
    },
    Text: {
        fontSize: 14, marginHorizontal: 10,
        alignSelf: 'center', textAlign: 'center',
        color: "#fff", fontWeight: "bold"
    },
    FoucsView: {
        justifyContent: 'center', borderRadius: 5, flexWrap: "wrap",
        flexDirection: 'row', alignSelf: 'center', width: "85%", marginVertical: 5
    },
    close: {
        borderRadius: 20, width: "25%", justifyContent: "center",
        backgroundColor: 'red', height: 30, alignSelf: "center"
    }
})
export default SharePlatforms;

