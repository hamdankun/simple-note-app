import React, { memo, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import BaseScreen from '@components/base-screen';

import NoteCard from './components/note';
import FloatingButton from './components/floating-button';
import Separator from './components/separator';
import AppLoader from '@components/app-loader';

import { noteGetListAction } from '@redux/actions/note';
import { unwrapResult } from '@reduxjs/toolkit';
import { showAlertError } from '@helpers/alert';
import { ErrorResponse } from '@helpers/http';
import { RootState } from '@redux/store';
import { NoteData } from '@services/note';

export default memo((): JSX.Element => {

    const dispatch = useDispatch();

    const isFetching = useSelector((state: RootState) => state.note.prosessing.isFetching);
    const data = useSelector((state: RootState) => state.note.data);

    function fetchData() {
        dispatch<any>(noteGetListAction())
            .then(unwrapResult)
            .catch((error: ErrorResponse) => showAlertError(error.error_message));
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <BaseScreen>
            <>
                <FlatList 
                    data={data}
                    renderItem={({item}) => <NoteCard data={item as NoteData} />}
                    keyExtractor={(_, index) => index.toString()}
                    ItemSeparatorComponent={Separator}
                    ListHeaderComponent={Separator}
                    ListFooterComponent={isFetching ? AppLoader : Separator}
                    initialNumToRender={5}
                    refreshing={false}
                    onRefresh={fetchData}
                />
                <FloatingButton />
            </>
        </BaseScreen>
    )
});