import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {getState, getCurrentState, fetchDataNew} from "./todoListSlice";
import TaskBlock from "../../components/TaskBlock/TaskBlock";

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
                <TaskBlock key={el.id} id={el.id} checked={el.checked} title={el.title}/>
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