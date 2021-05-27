/** @format */

export type ApiConfig = {
    debug: boolean;
    service: {
        [key: string]: string;
    };
    commonConfig: {
        [key: string]: any;
    };
    commonResponseMessage: {
        [key: string]: string;
    };
};

const appConfig: ApiConfig = {
    debug: __DEV__,
    service: {
        main: 'https://notes-dot-dev-backend-302906.et.r.appspot.com',
    },
    commonConfig: {
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    },
    commonResponseMessage: {
        INTERNAL_SERVER_ERROR:
            'Terjadi Kesalahan Silahkan Coba Beberapa Saat Lagi!',
    },
};

export default appConfig;
