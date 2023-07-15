import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import {getState, getCurrentState} from "./todoListSlice";

const TodoList = () => {
    const [task, setTask] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const taskInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await dispatch(getState(task));
            await dispatch(getCurrentState());
            setTask('');
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    let form = (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                required
                name="task"
                id="task"
                value={task}
                onChange={taskInputValue}
                placeholder="Type task"
            />
            <button type="submit">Send</button>
        </form>

    );

    if (loading) {
        form = <p>Loading</p>;
    }

    return (
        <div>
            {form}
        </div>
    );
};

export default TodoList;