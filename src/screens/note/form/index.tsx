import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import BaseScreen from '@components/base-screen';

import Form from './components/form';
import Navigation from './components/navigation';

type StackParamList = {
    NoteList: { type: 'add' | 'edit', title: string };
}

type FromScreenProps = RouteProp<StackParamList, 'NoteList'>

export default memo((): JSX.Element => {

    const navigation = useNavigation();
    const route = useRoute<FromScreenProps>();

    navigation.setOptions({
        title: route.params.title
    })

    return (
        <BaseScreen>
            <ScrollView>
                <Form />
                <Navigation />
            </ScrollView>
        </BaseScreen>
    )
})