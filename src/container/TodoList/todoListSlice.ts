import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { RootState } from "../../app/store";

interface TodoState {
    task: string;
    checked:boolean
}

const initialState: TodoState = {
    task: '',
    checked:false
};

export const getCurrentState = createAsyncThunk<void, undefined, {state: RootState}>(
    'todolist/increase',
    async (arg, thunkAPI) => {
        const current = thunkAPI.getState().todo.task;
        await axiosApi.post('/tasks.json', {title: current, checked: false} );
    }
);

export const todoSlice = createSlice({
    name: "todoList",
    initialState,
    reducers: {
        getState: (state, action: PayloadAction<string>) => {
            state.task = action.payload;
        },
    },

});



export const todoReducer = todoSlice.reducer;
export const {getState} = todoSlice.actions;