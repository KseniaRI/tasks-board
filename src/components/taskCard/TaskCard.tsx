import React from 'react';
import { useAppDispatch } from '../../redux/redux-hooks';
import {
    setFileIdx,
    setModalCommentsIsOpen,
    setModalFilesIsOpen,
    setModalTaskIsOpen,
    setTaskId,
} from '../../redux/actions';
import { ITask } from '../../types';
import TaskCardSidebar from './TaskCardSidebar';
import TaskCardDates from './TaskCardDates';
import TaskCardFiles from './TaskCardFiles';
import TaskCardSubtasks from './TaskCardSubtasks';

interface TaskCardProps {
    task: ITask;
}

const TaskCard = ({ task }: TaskCardProps) => {
    const { num, title, description, files } = task;

    const dispatch = useAppDispatch();

    const onTaskEdit = () => {
        dispatch(setModalTaskIsOpen(true));
        dispatch(setTaskId(task.id));
    };

    const onFilesShow = (index: number) => {
        dispatch(setModalFilesIsOpen(true));
        dispatch(setTaskId(task.id));
        //set index of file to be shown first in gallery:
        dispatch(setFileIdx(index));
    };

    const onCommentsShow = () => {
        dispatch(setModalCommentsIsOpen(true));
        dispatch(setTaskId(task.id));
    };

    const filesExist = files.length > 0;
    const taskCardFiles = filesExist && <TaskCardFiles files={files} onFilesShow={onFilesShow} />;

    return (
        <div className="task-card">
            <div className="task-card-content">
                <div className="task-title-wrap">
                    <span className="task-card-num">{num}</span>
                    <h3>{title}</h3>
                </div>
                <p className="task-card-text">{description}</p>
                {taskCardFiles}
                <TaskCardSubtasks task={task} />
                <TaskCardDates task={task} />
            </div>
            <TaskCardSidebar
                task={task}
                onTaskEdit={onTaskEdit}
                onFilesShow={onFilesShow}
                onCommentsShow={onCommentsShow}
            />
        </div>
    );
};

export default TaskCard;
