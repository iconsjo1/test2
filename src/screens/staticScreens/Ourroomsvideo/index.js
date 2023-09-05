import React, { useState } from 'react'
import HTML from 'react-native-render-html';
import { WP, colors } from '../../../services';
import { CustomHeader, TouchableOpacity } from '../../../components';
import { StyleSheet, I18nManager, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
// import Video from 'react-native-af-video-player'
import myVideo from '../../../assets/rooms.mp4';

const OurRooms = ({ navigation }) => {

    const htmlContetnt = `
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body style="
            overflow: hidden;
            " >
            <iframe id="my_iframe" src="https://drive.google.com/file/d/1hrR9Y_UbWrNTHeXl1ufovFo7vcwqWt61/preview" width="${WP('100')}"></iframe>
        </body>
        <script>
            function onload() {
                const divPop = document.querySelector('.ndfHFb-c4YZDc-Wrql6b');
                divPop.parentNode.removeChild(divPop);
            }
            document.querySelector('#my_iframe').onload=onload;
        </script>
    </html >
`;
    const url = `https://doc-10-74-docs.googleusercontent.com/docs/securesc/sssmbv0ros7cosltaai9jg0cpdd8m90v/g0beod92seo8f9erlvkqs4ojgo08cu4p/1598434875000/11221642811129928562/07188294108558939870Z/1hrR9Y_UbWrNTHeXl1ufovFo7vcwqWt61?e=download&nonce=l07lmgl2257jc&user=07188294108558939870Z&hash=vdv061j7kfrtfgr9vaa93`;
    return (
        <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles().backTouch}>
                <Feather name={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'} size={15} color={colors.grey} />
            </TouchableOpacity>
            {/* <HTML
                containerStyle={{ flex: 1, margin: 0, padding: 0, zIndex: 1 }}
                html={`
                <iframe id="my_iframe" src="https://drive.google.com/file/d/1hrR9Y_UbWrNTHeXl1ufovFo7vcwqWt61/preview" width="${WP('100')}"></iframe>
                `} /> */}
            {/* <Video
                onLoad={() => console.log('[LOADED]')}
                autoPlay={true}
                onEnd={() => {
                    setTimeout(() => {
                        navigation.goBack()
                    }, 100);
                }}
                fullScreenOnly={true}
                style={styles().video}
                rotateToFullScreen={false}
                lockPortraitOnFsExit={false}
                url={myVideo} /> */}
        </>
    );
}

export default OurRooms

const styles = () => StyleSheet.create({
    backTouch: {
        borderColor: colors.grey,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 5,
    },
    video: {
        width: WP('100'),
        height: WP('100'),
        zIndex: 4,
        marginTop: 100,
    }
})