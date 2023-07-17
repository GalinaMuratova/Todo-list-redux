import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {IApiTask, ITask, ITaskMutation, TodoState} from "../../types";
import {RootState} from "../../app/store";

const initialState: TodoState = {
    loading:false,
    tasksLoading:false,
    error:false,
    taskMas: [],
};

export const fetchDataNew = createAsyncThunk<ITask[]>(
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
);

export const getCurrentState = createAsyncThunk<void, ITaskMutation>(
    'todolist/getState',
    async (task,) => {
        await axiosApi.post('/tasks.json', task);
    }
);
export const changeChecked = createAsyncThunk<void , string, {state:RootState}> (
    'todoList/changeChecked',
    async (id, thunkAPI) => {
        const tasks = thunkAPI.getState().todo.taskMas;
        const currentTask = tasks.filter(task => task.id === id)[0];
        await axiosApi.put(`/tasks/${id}.json`, {
            ...currentTask,
            checked : !currentTask.checked
        });
    }
);

export const deleteTask = createAsyncThunk<void, string>(
    'todoList/deleteTask',
    async (taskId) => {
        await axiosApi.delete(`/tasks/${taskId}.json`);
    }
);

export const todoSlice = createSlice({
    name: "todoList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDataNew.pending, (state) => {
            state.tasksLoading = true;
            state.error = false;
        });
        builder.addCase(fetchDataNew.fulfilled, (state, action) => {
            state.tasksLoading = false;
            state.taskMas = action.payload;
        });
        builder.addCase(fetchDataNew.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
        builder.addCase(getCurrentState.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(getCurrentState.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(getCurrentState.rejected,  (state) => {
            state.loading = false;
            state.error = true;
        });
        builder.addCase(changeChecked.pending, (state) => {
            state.error = false;
        });
        builder.addCase(changeChecked.fulfilled, () => {

        });
        builder.addCase(changeChecked.rejected,  (state) => {
            state.error = true;
        });
        builder.addCase(deleteTask.pending, (state) => {
            state.error = false;
        });
        builder.addCase(deleteTask.fulfilled, () => {

        });
        builder.addCase(deleteTask.rejected,  (state) => {
            state.error = true;
        });
    },
});

export const todoReducer = todoSlice.reducer;