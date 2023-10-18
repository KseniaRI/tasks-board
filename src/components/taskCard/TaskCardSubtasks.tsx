import React from 'react';
import { useDispatch } from 'react-redux';
import { LuFiles } from 'react-icons/lu';
import { MdAdd } from 'react-icons/md';
import { ITask } from '../../types';
import { setModalSubtaskIsOpen, setTaskId } from '../../redux/actions';
import SubtaskCard from './SubtaskCard';

interface TaskCardTasksProps {
    task: ITask;
}

const TaskCardSubtasks = ({ task }: TaskCardTasksProps) => {
    const { id: taskId, subtasks } = task;

    const dispatch = useDispatch();

    const subtasksExist = subtasks.length > 0;

    const onAddSubtask = () => {
        dispatch(setModalSubtaskIsOpen(true));
        dispatch(setTaskId(taskId));
    };

    const subtasksList = subtasksExist && (
        <ul className="subtasks-list">
            {subtasks.map(subtask => {
                return (
                    <li key={subtask.id}>
                        <SubtaskCard subtask={subtask} />
                    </li>
                );
            })}
        </ul>
    );

    const addSubtaskText = !subtasksExist && <p className="section-text">You can add subtasks</p>;

    return (
        <div className="task-card-section">
            <span className="section-icon">
                <LuFiles size={17} />
            </span>
            {addSubtaskText}
            {subtasksList}
            <button type="button" className="section-btn" onClick={onAddSubtask}>
                <MdAdd size={20} />
            </button>
        </div>
    );
};

export default TaskCardSubtasks;
