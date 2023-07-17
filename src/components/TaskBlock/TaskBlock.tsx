import React from 'react';

interface Props {
    id:string,
    checked: boolean,
    title:string,
    onEdit: (id: string) => void;
    onDelete: () => void;
}

const TaskBlock:React.FC<Props> = ({checked, title, id, onEdit, onDelete}) => {
    return (
        <div className='m-4 border-black bg-light p-4 d-flex justify-content-between rounded'>
            <div>
                <input
                    type='checkbox'
                    className='me-3'
                    checked={checked}
                    onChange={() => onEdit(id)}
                />
                <span>{title}</span>
            </div>
            <button className='btn btn-danger' onClick={onDelete}>Delete</button>
        </div>
    );
};

export default TaskBlock;