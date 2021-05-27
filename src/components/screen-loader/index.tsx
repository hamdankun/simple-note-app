import React, { memo } from 'react';
import { View, ActivityIndicator } from 'react-native';

import styles from './styles';

export default memo((): JSX.Element => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' />
        </View>
    )
});