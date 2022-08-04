
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import AsyncStorage from "@react-native-async-storage/async-storage";
export const BASE_URL = "https://tecnotest.bahia.gob.ar/";
export const axiosLoggedInConfig = () => {
    const axiosService = axios.create({
        headers: {
            Authorization: `Bearer ${AsyncStorage.getItem('lgac')}`
        }
    });

    axiosService.interceptors.request.use(async (config) => {
        const token = await AsyncStorage.getItem('lgac');

        if (token !== null) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    axiosService.interceptors.response.use(
        (res) => Promise.resolve(res),
        (err) => Promise.reject(err)
    );

    const refreshAuthLogic = async (failedRequest) => {
        const refreshToken = await AsyncStorage.getItem('lgrf');
        console.log(refreshToken);
        if (refreshToken !== null) {
            return axios
                .post(
                    BASE_URL + 'refreshtoken/',
                    {
                         refresh : refreshToken
                    }
                )
                .then((resp) => {
                    const { access } = resp.data;
                    failedRequest.response.config.headers.Authorization = `Bearer ${access}`;
                    AsyncStorage.setItem('lgac', access);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

    return axiosService;
};

export const axiosLoggedInAndFileUploadConfig = () => {
    const axiosService = axios.create({
        headers: {
            Authorization: `Bearer ${localStorage.getItem('lgac')}`,
            'Content-Type': 'multipart/form-data'
        }
    });

    axiosService.interceptors.request.use(async (config) => {
        const token = await AsyncStorage.getItem('lgac');

        if (token !== null) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    axiosService.interceptors.response.use(
        (res) => Promise.resolve(res),
        (err) => Promise.reject(err)
    );

    const refreshAuthLogic = async (failedRequest) => {
        const refreshToken = await AsyncStorage.getItem('lgrf');
        if (refreshToken !== null) {
            return axios
                .post(
                    BASE_URL + 'refreshtoken/',
                    {
                        refresh: refreshToken
                    },
                    {
                        baseURL: BASE_URL
                    }
                )
                .then((resp) => {
                    const { access } = resp.data;
                    failedRequest.response.config.headers.Authorization = `Bearer ${access}`;
                    AsyncStorage.setItem('lgac', access);
                })
                .catch((err) => {
                    if (err.response && err.response.status === 400) {
                        AsyncStorage.setItem('lgac', 'null');
                        AsyncStorage.setItem('lgrf', 'null');
                    }
                });
        }
    };

    createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

    return axiosService;
};


export const axiosLoggedOutConfig = axios.create({});