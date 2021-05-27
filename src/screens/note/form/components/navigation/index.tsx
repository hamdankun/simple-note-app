import React, { memo } from 'react';
import { View, Button, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import Text from '@components/dynamic-text-color';

import styles from './styles';
import { 
    CommonActionReturnType,
    noteCreateDataAction, 
    noteUpdateDataAction ,
    noteDeleteDataAction
} from '@redux/actions/note';
import { showAlertError } from '@helpers/alert';
import { RootState } from '@redux/store';
import { NoteData } from '@services/note';

type StackParamList = {
    NoteList: { type: 'add' | 'edit', title: string, data: NoteData };
}

type FromScreenProps = RouteProp<StackParamList, 'NoteList'>


export default memo((): JSX.Element => {

    const navigation = useNavigation();
    const disaptch = useDispatch();
    const { params: { type, data } } = useRoute<FromScreenProps>();
    const { isSubmitting, isDeleting } = useSelector((state: RootState) => state.note.prosessing);

    if (type === 'edit') {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handleConfirmDelete}>
                    <Text style={styles.normalLabel}>Remove</Text>
                </TouchableOpacity>
            )
        });
    }

    function handleSubmit() {
        let actionsDispatcher: typeof noteCreateDataAction | typeof noteUpdateDataAction | null = null
        if (type === 'add') {
            actionsDispatcher = noteCreateDataAction;
        } else {
            actionsDispatcher = noteUpdateDataAction;
        }

        disaptch<any>(actionsDispatcher())
            .then(unwrapResult)
            .then((response: CommonActionReturnType<{}>) => {
                if (response.success) navigation.goBack();
            }).catch((error: CommonActionReturnType<{}>) => showAlertError(error.error_message as string));
    }

    function handleConfirmDelete(): void {

        if (isDeleting) return;

        const confirmedDelete = () => {
            disaptch<any>(noteDeleteDataAction(data._id))
                .then(unwrapResult)
                .then((response: CommonActionReturnType<{}>) => {
                    if (response.success) {
                        Alert.alert(
                            'Notice', 
                            'Note has been deleted',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.goBack()
                                }
                            ]
                        , { cancelable: true });
                    };
                })
                .catch((error: CommonActionReturnType<{}>) => showAlertError(error.error_message as string));
        }

        Alert
            .alert(
                'Confirmation',
                'Are you sure want to delete this note ?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Ok', onPress: confirmedDelete },
                ],
                { cancelable: true }
            );
    }

    return (
        <View style={styles.container}>
            <Button 
                title={isSubmitting ? 'Prosessing...' : 'Submit'}
                onPress={handleSubmit}
                disabled={isSubmitting || isDeleting}
            />
        </View>
    )
})