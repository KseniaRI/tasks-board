import React from 'react';
import { AiFillFire, AiOutlineComment, AiOutlineEdit, AiOutlinePaperClip } from 'react-icons/ai';
import { ITask, Priority } from '../../types';
import { countComments } from '../../utils/commonHelpers';

interface TaskCardSidebarProps {
    task: ITask;
    onTaskEdit: () => void;
    onFilesShow: (index: number) => void;
    onCommentsShow: () => void;
}

const TaskCardSidebar = ({
    task,
    onTaskEdit,
    onFilesShow,
    onCommentsShow,
}: TaskCardSidebarProps) => {
    const { priority, files, comments } = task;

    const filesExist = files.length > 0;
    const commentsExist = comments.length > 0;

    const setPriorityColor = (priority: Priority) => {
        switch (priority) {
            case Priority.LOW:
                return 'green';
            case Priority.HIGH:
                return 'orange';
            case Priority.CRITICAL:
                return 'red';
            default:
                return 'green';
        }
    };

    const totalComments = commentsExist ? countComments(comments) : null;

    const attachedFilesBtn = filesExist && (
        <button className="task-sidebar-button files" onClick={() => onFilesShow(0)}>
            <AiOutlinePaperClip size={20} />
            <span>{files.length}</span>
        </button>
    );

    return (
        <div className="task-card-sidebar">
            <span className="task-card-priority">
                <AiFillFire color={setPriorityColor(priority)} size={20} />
            </span>
            <button className="task-sidebar-button edit" onClick={onTaskEdit}>
                <AiOutlineEdit size={20} />
            </button>
            {attachedFilesBtn}
            <button className="task-sidebar-button comments" onClick={onCommentsShow}>
                <AiOutlineComment size={20} />
                <span>{totalComments}</span>
            </button>
        </div>
    );
};

export default TaskCardSidebar;
