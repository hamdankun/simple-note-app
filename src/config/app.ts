/** @format */

type AppConfig = {
    app: {
        [key: string]: any;
    };
    debug: boolean;
    route: {
        [key: string]: any;
    };
    session: {
        key: string;
    };
};

const appConfig: AppConfig = {
    app: {},
    debug: __DEV__,
    route: {
        initialRoute: 'home',
    },
    session: {
        key: '@note-app',
    }
};

export default appConfig;
