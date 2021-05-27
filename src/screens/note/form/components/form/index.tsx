import React, { memo, useEffect, useState } from 'react';
import { View, TextInput, TextInputProps, TouchableOpacity, Modal } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Text from '@components/dynamic-text-color';

import styles from './styles';

import { noteActions } from '@redux/reducerSlices/noteSlice';
import { noteAutoFillDataAction } from '@redux/actions/note';
import { RootState } from '@redux/store';
import { NoteData } from '@services/note';

type StackParamList = {
    NoteList: { type: 'add' | 'edit', title: string, data: NoteData };
}

type FromScreenProps = RouteProp<StackParamList, 'NoteList'>


export default memo((): JSX.Element => {

    const { params: { type, data } } = useRoute<FromScreenProps>();
    const dispatch = useDispatch();

    const form = useSelector((state: RootState) => state.note.form);

    function autoFillFormIfEditMode() {
        if (type === 'edit' && data) dispatch(noteAutoFillDataAction(data));
    }

    function handleUpdateTag(selectedTag: string) {
        const currentTags = [...(form.tags || [])];
        const index = currentTags.findIndex((tag: string) => tag === selectedTag);
        if (index === -1) {
            currentTags.push(selectedTag)
        } else {
            currentTags.splice(index, 1);
        }
        dispatch(noteActions.fillForm({ tags: currentTags }));
    }

    useEffect(() => {
        autoFillFormIfEditMode();
        return () => {
            dispatch(noteActions.resetForm());
        }
    }, []);

    return (
        <View style={styles.container}>
            <FormField 
                title='Title *'
                value={form.title || ''}
                onChange={(text: string) => dispatch(noteActions.fillForm({ title: text }))}
                error={form.formDirty && !form.title}
            />
            <FormField 
                title='Name *'
                value={form.detail || ''}
                onChange={(text: string) => dispatch(noteActions.fillForm({ detail: text }))}
                inputProps={{
                    multiline: true
                }}
                inputStyle={styles.textarea}
                error={form.formDirty && !form.detail}
            />
            <FormTag 
                selectedValue={form.tags || []}
                onSelected={handleUpdateTag}
            />
        </View>
    )
});

type FormFieldProps = {
    title: string,
    value: string,
    onChange: (value: string) => void,
    inputProps?: TextInputProps,
    inputStyle?: { [key:string]:any }
    error?: boolean
}

const FormField = memo(({ title, value, onChange, inputProps = {}, inputStyle = {}, error = false}: FormFieldProps): JSX.Element => {
    return (
        <View style={styles.fromGroup}>
            <Text>{title}</Text>
            <View style={styles.formInput}>
                <TextInput 
                    placeholder={`Enter ${title}`}
                    underlineColorAndroid='transparent'
                    onChangeText={onChange}
                    style={[styles.defaultForm, inputStyle || {}]}
                    value={value}
                    autoCapitalize='none'
                    autoCompleteType='off'
                    autoCorrect={false}
                    {...inputProps}
                />
            </View>
            {error ? <Text style={styles.errorLabel}>{`Required`}</Text> : null}
        </View>
    )
});

type FormTagProps = {
    selectedValue: Array<string>,
    onSelected: (item: string) => void
}

const tagOptions: Array<string> = [
    'office',
    'home',
    'holiday',
    'social'
]

const FormTag = memo(({ selectedValue, onSelected }: FormTagProps): JSX.Element => {

    const { top } = useSafeAreaInsets();

    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    function implodeTags(): string {
        return selectedValue && selectedValue.length > 0 ? selectedValue.map((tag: string) => `#${tag}`).join(' ') : 'Enter Tags';
    }

    function handleOpenModal() {
        setModalVisible(true)
    }

    function isSelected(item: string): boolean {
        return selectedValue && selectedValue.indexOf(item) !== -1
    }

    return (
        <>
            <TouchableOpacity onPress={handleOpenModal}>
                <View style={styles.fromGroup}>
                    <Text>Tags</Text>
                    <View style={styles.formInput}>
                        <Text>{implodeTags()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
                <Modal
                    visible={isModalVisible}
                    animationType='slide'
                    onRequestClose={() => setModalVisible(false)}
                    >
                        {isModalVisible ? <View style={[styles.modalContainer, { marginTop: top }]}>
                            {
                                tagOptions.map((tag: string) => 
                                    (
                                        <TouchableOpacity key={tag} style={styles.modalItem} onPress={() => onSelected(tag)}>
                                            <Text>{tag}</Text>
                                            {isSelected(tag) ? <Text>(selected)</Text> : null}
                                        </TouchableOpacity>
                                    )
                                )
                            }
                            <TouchableOpacity 
                                onPress={() => setModalVisible(false)}
                                style={styles.closeAction}
                            >
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View> : null}
                </Modal>
        </>
    )
});