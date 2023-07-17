import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {getCurrentState, fetchDataNew, changeChecked, deleteTask} from "./todoListSlice";
import TaskBlock from "../../components/TaskBlock/TaskBlock";
const TodoList = () => {
    const [task, setTask] = useState('');
    const items = useSelector((state: RootState) => state.todo.taskMas);
    const loading = useSelector((state: RootState) => state.todo.loading);
    const tasksLoading = useSelector((state:RootState) => state.todo.tasksLoading);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDataNew());
    }, [dispatch]);

    const taskInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    };
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(getCurrentState({
            title: task,
            checked: false,
        }));
        setTask('');
        dispatch(fetchDataNew());
    };

    const onEditTaskStatusHandler = async (id: string) => {
        await dispatch(changeChecked(id));
        await dispatch(fetchDataNew());
    };

    const deleteBlock = async(taskId : string) => {
        if (window.confirm(`Do you want to delete task?`)) {
            await dispatch(deleteTask(taskId));
            await dispatch(fetchDataNew());
        }
    };

    let form = (
        <form onSubmit={onSubmit} className='d-flex my-3 mx-5'>
            <input
                type="text"
                required
                name="task"
                id="task"
                value={task}
                onChange={taskInputValue}
                placeholder="Type task"
                className='form-control mx-3'
            />
            <button type="submit" className='btn btn-primary'>Send</button>
        </form>
    );

    if (loading) {
        form = <p>Loading</p>;
    }

    let tasksBlock = (
        <>
            {items.map((el) => (
                <TaskBlock onEdit={onEditTaskStatusHandler} key={el.id} id={el.id} checked={el.checked} title={el.title} onDelete={() => deleteBlock(el.id)}/>
            ))}
        </>
    );

    if (tasksLoading) {
        tasksBlock = <p>Loading</p>
    }

    return (
        <div className='container'>
            {form}
            {tasksBlock}
        </div>
    );
};

export default TodoList;