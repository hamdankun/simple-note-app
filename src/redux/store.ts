/** @format */

import {
    configureStore,
    ThunkAction,
    Action,
} from '@reduxjs/toolkit';

import noteSliceReducer from './reducerSlices/noteSlice';

export const store = configureStore({
    reducer: {
        note: noteSliceReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
