import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OompaLoompa } from '../Models/OompaLoompa';
import { RootState } from './store';

const initialState = {
    oompaLoompas: [] as OompaLoompa[],
};

const oompaLoompaSlice = createSlice({
    name: 'oompaLoompa',
    initialState,
    reducers: {
        addOompaLoompa: (state, action: PayloadAction<OompaLoompa>) => {
            const exists = state.oompaLoompas.some(
                (oompaLoompa) => oompaLoompa.id === action.payload.id
            );
            if (!exists) {
                state.oompaLoompas.push(action.payload);
            }
        },
        addDescription: (state, action: PayloadAction<{ id: string, description: string }>) => {
            const { id, description } = action.payload;
            const oompaLoompa = state.oompaLoompas.find(oompaLoompa => oompaLoompa.id === id);
            if (oompaLoompa) {
                oompaLoompa.description = description;
            }
        }
    },
});


export const { addOompaLoompa, addDescription } = oompaLoompaSlice.actions;
export default oompaLoompaSlice.reducer;

export const selectOompaLoompaById = (id: string) => (state: RootState) => {
    return state.oompaLoompa!!.oompaLoompas.find((oompaLoompa: OompaLoompa) => oompaLoompa.id == id) || null;
};