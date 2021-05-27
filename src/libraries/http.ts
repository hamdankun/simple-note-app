/** @format */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import apiConfig from '@config/api';

const createBaseHttpRequest = (baseURL: string) =>
    axios.create({
        baseURL,
        ...apiConfig.commonConfig,
    });

type HTTPRequestLogger<T> = {
    path: string;
    method: string;
    body: T;
};

export type HttpMethod = {
    getHttpRequest: <T>(
        path: string,
        additionalConfig?: AxiosRequestConfig
    ) => Promise<T>;
    postHttpRequest: <T>(
        path: string,
        body: object,
        additionalConfig?: AxiosRequestConfig
    ) => Promise<T>;
    putHttpRequest: <T>(
        path: string,
        body: object,
        additionalConfig?: AxiosRequestConfig
    ) => Promise<T>;
    deleteHttpRequest: <T>(
        path: string,
        additionalConfig?: AxiosRequestConfig
    ) => Promise<T>;
    rawtHttpRequest: () => AxiosInstance;
};

const httpRequestLogger: Function = ({
    path,
    method,
    body,
}: HTTPRequestLogger<object>) => {
    if (apiConfig.debug) {
        console.log(`[HTTP REQUEST][${method}]`, path, body);
    }
};

export default (baseURL: string = apiConfig.service.main): HttpMethod => ({
    /**
     * GET HTTP Request
     */
    getHttpRequest: <T>(
        path: string,
        additionalConfig?: object
    ): Promise<T> => {
        httpRequestLogger({ path, additionalConfig, method: 'GET' });
        return createBaseHttpRequest(baseURL)
            .get(path, additionalConfig)
            .then((response) => response.data);
    },
    /**
     * POST HTTP Request
     */
    postHttpRequest: <T>(
        path: string,
        body: object,
        additionalConfig: object = {}
    ): Promise<T> => {
        httpRequestLogger({ path, body, additionalConfig, method: 'POST' });
        return createBaseHttpRequest(baseURL)
            .post(path, body, additionalConfig)
            .then((response) => response.data);
    },
    /**
     * PUT HTTP Request
     */
    putHttpRequest: <T>(
        path: string,
        body: object,
        additionalConfig: object = {}
    ): Promise<T> => {
        httpRequestLogger({ path, body, additionalConfig, method: 'PUT' });
        return createBaseHttpRequest(baseURL)
            .put(path, body, additionalConfig)
            .then((response) => response.data);
    },
    /**
     * PUT HTTP Request
     */
     deleteHttpRequest: <T>(
        path: string,
        additionalConfig: object = {}
    ): Promise<T> => {
        httpRequestLogger({ path, additionalConfig, method: 'PUT' });
        return createBaseHttpRequest(baseURL)
            .delete(path, additionalConfig)
            .then((response) => response.data);
    },
    /**
     * Any HTTP Request
     */
    rawtHttpRequest: (): AxiosInstance => createBaseHttpRequest(baseURL),
});
