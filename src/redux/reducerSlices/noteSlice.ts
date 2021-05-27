/** @format */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
    noteGetListAction,
    noteCreateDataAction,
    noteUpdateDataAction,
    noteDeleteDataAction
} from '@redux/actions/note';
import { NoteData } from '@services/note';

export type NoteState = {
    prosessing: {
        isFetching: boolean;
        isSubmitting: boolean;
        isDeleting: boolean;
    };
    isError: boolean;
    data: Array<NoteData>;
    form: { [key:string]: any }
};

const initialState: NoteState = {
    prosessing: {
        isFetching: false,
        isSubmitting: false,
        isDeleting: false
    },
    isError: false,
    data: [],
    form: {}
};

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        setProsessing: (
            state,
            action: PayloadAction<{ [key: string]: boolean }>
        ) => {
            state.prosessing = {
                ...state.prosessing,
                ...action.payload,
            };
        },
        setData: (
            state,
            action: PayloadAction<Array<NoteData>>
        ) => {
            state.data = action.payload;
        },
        setError: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        },
        fillForm: (
            state,
            action: PayloadAction<{ [key:string]:any }>
        ) => {
            state.form = {
                ...state.form,
                ...action.payload
            }
        },
        resetForm: (state) => {
            state.form = {}
        }
    },
    extraReducers: {
        [`${noteGetListAction.pending}`]: (state) => {
            state.prosessing.isFetching = true;
            state.isError = false;
        },
        [`${noteGetListAction.fulfilled}`]: (state) => {
            state.prosessing.isFetching = false;
            state.isError = false;
        },
        [`${noteGetListAction.rejected}`]: (state) => {
            state.prosessing.isFetching = false;
            state.isError = false;
        },
        [`${noteCreateDataAction.pending}`]: (state) => {
            state.prosessing.isSubmitting = true;
        },
        [`${noteCreateDataAction.fulfilled}`]: (state) => {
            state.prosessing.isSubmitting = false;
        },
        [`${noteCreateDataAction.rejected}`]: (state) => {
            state.prosessing.isSubmitting = false;
        },
        [`${noteUpdateDataAction.pending}`]: (state) => {
            state.prosessing.isSubmitting = true;
        },
        [`${noteUpdateDataAction.fulfilled}`]: (state) => {
            state.prosessing.isSubmitting = false;
        },
        [`${noteUpdateDataAction.rejected}`]: (state) => {
            state.prosessing.isSubmitting = false;
        },
        [`${noteDeleteDataAction.pending}`]: (state) => {
            state.prosessing.isDeleting = true;
        },
        [`${noteDeleteDataAction.fulfilled}`]: (state) => {
            state.prosessing.isDeleting = false;
        },
        [`${noteDeleteDataAction.rejected}`]: (state) => {
            state.prosessing.isDeleting = false;
        },
    }
});

export const noteActions = noteSlice.actions;

export default noteSlice.reducer;
