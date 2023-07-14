import React, {useState} from 'react';
import axiosApi from "../../axiosApi";

const TodoList = () => {
    const [task, setTask] = useState('');
    const taskInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    };
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true)
            await axiosApi.post('tasks.json', {title: task, checked: false});
            setTask('');
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
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