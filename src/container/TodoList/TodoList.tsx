import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {getState, getCurrentState, fetchDataNew} from "./todoListSlice";

const TodoList = () => {
    const [task, setTask] = useState('');
    const items = useSelector((state: RootState) => state.todo.taskMas);
    const loading = useSelector((state: RootState) => state.todo.loading);
    const tasksLoading = useSelector((state:RootState) => state.todo.tasksLoading);
    const dispatch: AppDispatch = useDispatch();

    const taskInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(getState(task));
        await dispatch(getCurrentState());
        setTask('');
        dispatch(fetchDataNew())
    };

    useEffect(() => {
        dispatch(fetchDataNew())
    }, [dispatch]);

    let form = (
        <form onSubmit={onSubmit} className='d-flex m-3'>
            <input
                type="text"
                required
                name="task"
                id="task"
                value={task}
                onChange={taskInputValue}
                placeholder="Type task"
                className='form-control'
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
                <div className='m-4 border-black bg-light p-4'>
                    <input type='checkbox' className='me-3' checked={el.checked}/>
                    <span>{el.title}</span>
                </div>
            ))}
        </>
    );

    if (tasksLoading) {
        tasksBlock = <p>Loading</p>
    }

    return (
        <div>
            {form}
            {tasksBlock}
        </div>
    );
};

export default TodoList;