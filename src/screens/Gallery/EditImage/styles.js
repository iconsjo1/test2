import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default {
  container: {
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: "center"
  },
  image: {
    width: windowWidth,
    height: windowHeight,
    alignSelf: 'center',
    margin: 8,
    resizeMode: "contain",
    alignSelf: "center"
  },
  loadingView: {
    flex: 1,
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%", height: "100%"
  }
};
