import {createSlice} from "@reduxjs/toolkit";

interface TodoState {
    value: number;
}

const initialState: TodoState = {
    value: 0,
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {}
});

export const todoReducer = counterSlice.reducer;