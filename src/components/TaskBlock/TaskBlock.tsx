import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {fetchDataNew, getId} from "../../container/TodoList/todoListSlice";
import axiosApi from "../../axiosApi";
import {AppDispatch} from "../../app/store";

interface Props {
    id:string,
    checked: boolean,
    title:string
}

const TaskBlock:React.FC<Props> = ({checked, title, id}) => {
    const dispatch:AppDispatch = useDispatch();
    const [agreement, setAgreement] = useState(false);

    const getIdNew = async () => {
        await dispatch(getId(id));
        console.log(id)
    };

    const deleteBlock = async() => {
      if (window.confirm(`Do you want to delete ${title} task?`)) {
          await axiosApi.delete(`/tasks/${id}.json`);
          await dispatch(fetchDataNew());
      }
    };

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setAgreement(event.target.checked);
        console.log(agreement)
    };
    return (
        <div className='m-4 border-black bg-light p-4'>
            <input type='checkbox' className='me-3' checked={checked} onChange={getIdNew}/>
            <span>{title}</span>
            <button className='btn btn-danger' onClick={deleteBlock}>Delete</button>
            <input type='checkbox' onChange={handleChange}/>
        </div>
    );
};

export default TaskBlock;