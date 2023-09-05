import {StyleSheet} from 'react-native';
import { colors, fontFamilies } from '../../../services';
const styles = () => StyleSheet.create({
    textBreak: {flex: 1, flexWrap: 'wrap'},
    btnText: {flex: 1, flexWrap: 'wrap',textAlign: 'center', color: colors.btnColor,fontWeight: '500'},
    btnWraper: {flexDirection: 'row',minWidth: 60,paddingVertical: 7, alignItems: 'center', justifyContent: 'center', borderRadius: 5},
    ReportFormWrapper: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
    },
    imageStyle: {
        alignSelf: 'center'
    },
    modalContenHeaderStyle: { height: 6, width: 48, backgroundColor: '#E0E0E0', alignSelf: 'center', borderRadius: 15 },
    titleStyle: {
        color: colors.black,
        fontFamily: fontFamilies('boldText'),
        fontSize: 17,
        textAlign: 'center',
        marginTop: 30,
    },
    fileNoStyle: {
        marginTop: 30
    },
    phoneNoStyle: {
        marginTop: 30,
        marginBottom: 30
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: colors.white,
        padding: 22,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 30,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        zIndex: 1
      },
      modalView: {
        margin: 20,
        backgroundColor: colors.lightGrey,
        borderRadius: 5,
        alignItems: "center",
      },
      openButton: {
        backgroundColor: colors.success,
        padding: 5,
        margin: 2,
        borderRadius:4
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        fontSize: 17,
        textAlign: "center",
        color: colors.black
      }
})



export default styles;