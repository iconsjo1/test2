import { Platform } from "react-native";

export const baseUrl = 'https://www.udh.com';
export const hospitalLocation = (() => {
    const lat = "21.5055055";
    const lng = "39.1662426";
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const label = 'United doctors hospital';
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });

    return url;
})();
export const hospitalEmail = "mailto:care@udh.med.sa";
export const hospitalPhone = "tel:00966126533333";