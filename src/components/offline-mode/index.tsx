import React, { memo } from 'react';
import { useColorScheme } from 'react-native';
import { View, Text } from 'react-native';

import styles from './styles';

export default memo((): JSX.Element => {
    const isDark = useColorScheme() === 'dark';

    const noticeTheme: 'noticeDark' | 'noticeNormal' = isDark ? 'noticeDark' : 'noticeNormal'

    return (
        <View style={styles.container}>
            <Text style={styles[noticeTheme]}>Koneksi Tidak Tersedia{'\n'}Harap Nyalakan Koneksi Internet Anda!</Text>
        </View>
    )
})