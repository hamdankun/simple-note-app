import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Text from '@components/dynamic-text-color';

import styles from './styles'

export default memo((): JSX.Element => {

    const navigation = useNavigation();

    function handleNavigate() {
        navigation.navigate('note.form', { type: 'add', title: 'Add Note' });
    }

    return (
        <TouchableOpacity onPress={handleNavigate} style={styles.container}>
            <Text style={styles.label}>+</Text>
        </TouchableOpacity>
    )
})