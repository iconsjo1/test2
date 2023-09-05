import { homeReducersTypes, apis } from "../../../services";
import { I18nManager } from "react-native";

const {
    SET_ALL_NEWS
} = homeReducersTypes;

export const getAllNews = (lang, cbSuccess, cbFailure) => async dispatch => {
    try {
        const { data } = await apis.getAllNews(lang);
        dispatch({
            type: SET_ALL_NEWS,
            payload: data
        })
        cbSuccess(I18nManager.isRTL ? data.length - 1 : 0);
    } catch (e) {
        console.log('[ALL NEWS ERROR]', e, e.response);
        cbFailure();
    }
}