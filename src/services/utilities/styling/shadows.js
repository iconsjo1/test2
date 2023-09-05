import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const shadows = StyleSheet.create({
    lightShadow: {
        shadowColor: colors.white,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.4,
    },
    lightShadowBlack: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.2,
    },
    darkShadowBlack: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
        shadowOpacity: 0.5,
    },
    lightShadowGrey: {
        shadowColor: colors.grey,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.3,
    },
    lightShadowGreyLowSpread: {
        shadowColor: colors.grey,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 7,
        shadowOpacity: 0.3,
    },
    extraLightShadowGrey: {
        shadowColor: colors.grey,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
    }
});