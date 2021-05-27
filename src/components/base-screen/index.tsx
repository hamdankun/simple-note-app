import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import styles from './styles';

import ScreenLoader from '@components/screen-loader';


type BaseScreenProps = {
    delay?: number,
    onAppear?: () => void,
    safeAreaEdges?: ReadonlyArray<'top' | 'right' | 'bottom' | 'left'>,
    backgroundColor?: string,
    children: React.ReactChild
}

const BaseScreen = ({ 
    children, 
    delay = 0, 
    onAppear, 
    safeAreaEdges = ['right', 'left', 'top'] 
}: BaseScreenProps): JSX.Element => {

    const isDarkMode = useColorScheme() === 'dark';

    const [display, setDisplay] = useState(false);

    const displayScreen = () => {
        setTimeout(() => {
            setDisplay(true);
        }, delay);
    }

    const setBackgroundColor = () => {
        return {
            backgroundColor: isDarkMode ? Colors.black : Colors.white
        }
    }

    useLayoutEffect(() => {
        displayScreen();
    }, []);

    useEffect(() => {
        if (display && onAppear) onAppear()
    }, [display]);

    return (
        <SafeAreaView style={[styles.container, setBackgroundColor()]} edges={safeAreaEdges}>
            {display ? children : <ScreenLoader />}
        </SafeAreaView>
    )
}

export default BaseScreen;