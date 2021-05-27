import React, { memo } from 'react';
import { ColorSchemeName, View, useColorScheme, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Text from '@components/dynamic-text-color';

import styles from './styles';
import { formatFromISO } from '@libraries/date';
import { NoteData } from '@services/note';

type NoteCard = {
    data: NoteData
}

export default memo(({ data }: NoteCard) => {

    const navigation = useNavigation();
    const colorScheme: ColorSchemeName = useColorScheme();

    const { title, createdAt, detail, tags } = data;

    const containerStyle: 'containerDark' | 'containerLight' = (colorScheme === 'dark' ? 'containerDark' : 'containerLight');

    function handleNavigate(): void {
        navigation.navigate('note.form', { title: 'Edit Note', type: 'edit', data });
    }

    function implodeTags(): string {
        return tags ? tags.map((tag: string) => `#${tag}`).join(' ') : '';
    }

    return (
        <TouchableWithoutFeedback onPress={handleNavigate}>
            <View style={styles[containerStyle]}>
                <View style={styles.row}>
                    <View style={styles.circle} />
                    <View>
                        <Text textProps={{
                            numberOfLines: 2
                        }}>{title}</Text>
                        <Text>{formatFromISO(createdAt)}</Text>
                        <Text
                            style={styles.pushTop}
                            textProps={{
                                numberOfLines: 5
                            }}
                        >{detail}</Text>
                        <Text style={styles.pushTop}>{implodeTags()}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
})