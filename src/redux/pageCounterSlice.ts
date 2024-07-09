import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    pageCounter: 1
};

const pageCounterSlice = createSlice({
    name: 'pageCounter',
    initialState,
    reducers: {
        advancePage: (state, action: PayloadAction<number>) => {
            state.pageCounter = state.pageCounter + action.payload
        }
    },
});

export const { advancePage } = pageCounterSlice.actions;
export default pageCounterSlice.reducer;