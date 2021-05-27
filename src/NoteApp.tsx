import React, { memo, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Provider } from 'react-redux';

import { store } from '@redux/store';

import Navigation from './navigation';
import Offline from '@components/offline-mode';

let networkListener: any = null;

export default memo(() => {

    const [isOnline, setIsOnline] = useState(true);

    const _newtorkListener = () => {
        networkListener = NetInfo.addEventListener(state => {
            if (state.isConnected && isOnline !== state.isConnected) {
                setIsOnline(state.isConnected);
            }
        })
    }

    useEffect(() => {
        _newtorkListener();
        return () => {
            if (networkListener) networkListener();
        }
    }, []);

    return (
        isOnline ? <Provider store={store}>
                <Navigation />
        </Provider> : <Offline />
    )
})