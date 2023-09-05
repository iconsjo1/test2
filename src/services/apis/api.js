import Axios from "axios";
import { environment } from "./environment";

export default (endPoint, data) => {
    endPoint.data = data;
    switch (endPoint.type) {
        case 'POST':
            return axiosPOST(endPoint);
        case 'post':
            return axiospost(endPoint);
        case 'GET':
            return axiosGet(endPoint);
        case 'put':
            return axiosPutConfig_put(endPoint);
        case 'PUT':
            return axiosPutConfig_PUT(endPoint);
        default:
            break;
    }
}

export const axiosPOST = async ({ address: route, data, guarded: isGuarded, testData }) => {
    console.log('[LINK TO BE APPROACHED] POST ', route);
    if (environment.mock) if (testData) return await mockAPI(testData);
    return await Axios.post(route, data, isGuarded ? {
        headers: {
            'Authorization': 'ak ' + environment.key
        }
    } : null);
}

export const axiospost = async ({ address: route, data, guarded: isGuarded, testData }) => {
    console.log('[LINK TO BE APPROACHED] post ', route);
    if (environment.mock) if (testData) return await mockAPI(testData);
    return Axios({
        url: route,
        method: 'post',
        data,
        headers: isGuarded ? {
            'Authorization': 'ak ' + environment.key
        } : null
    })
}

export const axiosGet = async ({ address: route, data, guarded: isGuarded, testData }) => {
    console.log('[LINK TO BE APPROACHED] GET', route + (data ? data : ""));
    if (environment.mock) if (testData) return await mockAPI(testData);
    return await Axios.get(route + (data ? data : ""), isGuarded ? {
        headers: {
            'Authorization': 'ak ' + environment.key
        }
    } : null);
}

const axiosPutConfig_put = async ({ address: route, data, guarded: isGuarded, testData }) => {
    console.log('[LINK TO BE APPROACHED] put', route);
    if (environment.mock) if (testData) return await mockAPI(testData);
    return await Axios({
        url: route,
        data,
        headers: isGuarded ? {
            'Authorization': 'ak ' + environment.key,
            'Access-Control-Allow-Origin': '*',
        } : null,
        method: 'put'
    });
}

const axiosPutConfig_PUT = async ({ address: route, data, guarded: isGuarded, testData }) => {
    console.log('[LINK TO BE APPROACHED] PUT', route);
    if (environment.mock) if (testData) return await mockAPI(testData);
    return await Axios.put(route, data, {
        headers: isGuarded ? {
            'Authorization': 'ak ' + environment.key,
            'Access-Control-Allow-Origin': '*',
        } : null
    })
}


const mockAPI = data => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('[THIS DATA IS COMIGN FROM A MOCK JSON]');
        resolve({ data });
    }, 500)
});