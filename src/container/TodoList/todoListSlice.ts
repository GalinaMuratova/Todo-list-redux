import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { RootState } from "../../app/store";
import {IApiTask, ITask} from "../../types";

interface TodoState {
    task: string;
    checked:boolean;
    loading: boolean;
    tasksLoading:boolean;
    error: boolean;
    taskMas:ITask[];
}

const initialState: TodoState = {
    task: '',
    checked:false,
    loading:false,
    tasksLoading:false,
    error:false,
    taskMas: [],
};

export const fetchDataNew = createAsyncThunk(
    'todoList/fetch',
    async () => {
        const response = await axiosApi.get<IApiTask>('tasks.json');
        const newResponse = response.data;
        let newTask:ITask[] = [];
        if (newResponse) {
             newTask = Object.keys(response.data).map((key) => {
                const newPost = response.data[key];
                newPost.id = key;
                return newPost;
            });
        }
        return newTask;
    }
)
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
    extraReducers: (builder) => {
        builder.addCase(fetchDataNew.pending, (state) => {
            state.tasksLoading = true;
            state.error = false;
        });
        builder.addCase(fetchDataNew.fulfilled, (state, action) => {
            state.tasksLoading = false;
            state.taskMas = action.payload;
            console.log(action.payload)
        });
        builder.addCase(fetchDataNew.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
        builder.addCase(getCurrentState.pending, (state) => {
            state.loading = true;
            state.error = false;
            console.log(state.loading)
            getCurrentState();
        });
        builder.addCase(getCurrentState.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(getCurrentState.rejected,  (state) => {
            state.loading = false;
        });
    },
});



export const todoReducer = todoSlice.reducer;
export const {getState} = todoSlice.actions;