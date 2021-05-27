/** @format */
import { createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs'

import { noteActions } from '@redux/reducerSlices/noteSlice';

import {
    NoteData,
    noteGetListService,
    noteCreateDataService,
    noteUpdateDataService,
    noteDeleteDataService
} from '@services/note'
import { catchHttpError } from '@helpers/http';
import storage from '@libraries/storage';
import { RootState } from '@redux/store';
import { createUUID } from '@helpers/string';

type ThunkApi = {
    getState: () => RootState
}

export type CommonActionReturnType<T> = {
    success: boolean,
    data?: T,
    error_message?: string
}

const noteDayStorageKey = 'note-data';

export const noteGetListAction = createAsyncThunk('actions/note/get-list', async (_, thunkAPI) => {
    try {

        const localData = await storage.get<Array<NoteData>>(noteDayStorageKey);

        let data: Array<NoteData> = [];

        if (localData) {
            data = localData;
        } else {
            const response = await noteGetListService();
            if (!response.success) throw new Error('Whoops Something Went Wrong!');
            data = response.data;
            storage.set<Array<NoteData>>(noteDayStorageKey, data);
        }

        thunkAPI.dispatch(noteActions.setData(_sortByDesc(data)));
        
    } catch (e) {
        return thunkAPI.rejectWithValue(catchHttpError(e));
    }
});

export const noteCreateDataAction = createAsyncThunk('actions/note/create-data', async (_, thunkAPI) => {
    try {

        const { form, data } = _extractNoteCommonState(thunkAPI as ThunkApi);

        if (!_validate(form as NoteData)) {
            thunkAPI.dispatch(noteActions.fillForm({ formDirty: true }));
            return { success: false };
        }

        if (form.formDirty) {
            thunkAPI.dispatch(noteActions.fillForm({ formDirty: false }));
        }

        const newData: NoteData = {
            ...(form as NoteData),
            _id: createUUID(),
            __v: 0,
            createdAt: dayjs().toISOString(),
            updatedAt: dayjs().toISOString()
        }

        data.splice(0, 0, newData)

        thunkAPI.dispatch(noteActions.setData(data));

        _updateLocalData(data);

        _silentPromiseError(async () => {
            await noteCreateDataService(newData);
        });

        return { success: true, data: {} };
    } catch (e) {
        return thunkAPI.rejectWithValue(catchHttpError(e));
    }
});

export const noteUpdateDataAction = createAsyncThunk('actions/note/update-data', async (_, thunkAPI) => {
    try {

        const { form, data } = _extractNoteCommonState(thunkAPI as ThunkApi);
        
        if (!_validate(form as NoteData)) {
            thunkAPI.dispatch(noteActions.fillForm({ formDirty: true }));
            return { success: false };
        }

        const indexData = data.findIndex((item) => item._id == form._id);
        const updatedData: NoteData = {
            ...(form as NoteData),
            updatedAt: dayjs().toISOString()
        }
        data[indexData] = updatedData;

        thunkAPI.dispatch(noteActions.setData(data));
        
        _updateLocalData(data);

        _silentPromiseError(async () => {
            await noteUpdateDataService(updatedData._id, updatedData);
        });

        return { success: true, data: {} };
    } catch (e) {
        return thunkAPI.rejectWithValue(catchHttpError(e));
    }
});

export const noteDeleteDataAction = createAsyncThunk('actions/note/delete-data', async (itemUUID: string, thunkAPI) => {
    try {

        const { data } = _extractNoteCommonState(thunkAPI as ThunkApi);
        const indexData = data.findIndex((item) => item._id == itemUUID);

        data.splice(indexData, 1);

        
        thunkAPI.dispatch(noteActions.setData(data));
        
        _updateLocalData(data);

        _silentPromiseError(async () => {
            await noteDeleteDataService(itemUUID);
        });

        return { success: true, data: {} };
    } catch (e) {
        return thunkAPI.rejectWithValue(catchHttpError(e));
    }
});

export const noteAutoFillDataAction = createAsyncThunk('actions/note/delete-data', async (noteData: NoteData, thunkAPI) => {
    try {

        thunkAPI.dispatch(noteActions.fillForm({
            ...noteData
        }));

        return { success: true, data: {} };
    } catch (e) {
        return thunkAPI.rejectWithValue(catchHttpError(e));
    }
});

function _updateLocalData(data: Array<NoteData>): void {
    storage.set(noteDayStorageKey, data);
}

function _extractNoteCommonState(thunkAPI: ThunkApi): { form: { [key:string]:any }, data: Array<NoteData> } {
    const state = thunkAPI.getState()
    const data: Array<NoteData> = [...state.note.data];
    const form = state.note.form;
    return { form, data };
}


async function _silentPromiseError (callback: () => void) {
    try {
        await callback();
    } catch(e) {
        // just silent
    }
}

function _sortByDesc(data: Array<NoteData>): Array<NoteData> {
    return [...data].sort((a, b) => (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) as number);
}

function _validate(form: NoteData) {
    let invalid = false;
    
    if (!form.title) {
        invalid = true;
    }

    if (!form.detail) {
        invalid = true;
    }

    return !invalid;
}