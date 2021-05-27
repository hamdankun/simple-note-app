import React, { memo } from 'react';
import { View } from 'react-native';


import styles from './styles'

export default memo((): JSX.Element => {
    return (
        <View style={styles.container} />
    )
})