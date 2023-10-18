import React from 'react';
import { createPortal } from 'react-dom';
import { FormEvent, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import {
    getProjects,
    getSelectedProjectId,
    getTask,
    getTaskId,
    getTasksOfSelectedProject,
} from '../../redux/selectors';
import { setModalCommentsIsOpen, setTaskId, updateTask } from '../../redux/actions';
import { updateProjectsInLocalstorage } from '../../utils/localStorageOperations';
import { handleBackdropClick } from '../../utils/commonHelpers';
import { IComment, ITask } from '../../types';
import CloseBtn from '../CloseBtn';
import CommentsList from '../comment/CommentsList';
import CommentForm from '../comment/CommentForm';

const modalCommentsRoot = document.querySelector('#modal-comments');
if (!modalCommentsRoot) {
    throw new Error('Modal task root element not found');
}

const ModalComments = () => {
    const dispatch = useAppDispatch();
    const projectId = useAppSelector(getSelectedProjectId);
    const projects = useAppSelector(getProjects);
    const taskId = useAppSelector(getTaskId);
    const task = useAppSelector(getTask);
    const tasks = useAppSelector(getTasksOfSelectedProject);

    const [commentText, setCommentText] = useState('');
    const [replies, setReplies] = useState<IComment[]>(task?.comments || []);

    const onClose = useCallback(() => {
        dispatch(setModalCommentsIsOpen(false));
        dispatch(setTaskId(''));
    }, [dispatch]);

    useEffect(() => {
        const handleKeyPress = (evt: KeyboardEvent) => {
            if (evt.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [onClose]);

    const updateReplies = (
        currentComments: IComment[],
        parentCommentId: string,
        newReply: IComment,
    ): IComment[] => {
        return currentComments.map(comment => {
            if (comment.id === parentCommentId) {
                return {
                    ...comment,
                    replies: [newReply, ...comment.replies],
                };
            } else if (comment.replies.length > 0) {
                return {
                    ...comment,
                    replies: updateReplies(comment.replies, parentCommentId, newReply),
                };
            }
            return comment;
        });
    };

    const addReply = (newReplyText: string, parentId: string) => {
        const newReply: IComment = {
            id: uuidv4(),
            text: newReplyText,
            replies: [],
        };
        const updatedReplies = updateReplies(replies, parentId, newReply);
        setReplies(updatedReplies);

        if (task) {
            const editedTask = {
                ...task,
                comments: updatedReplies,
            };
            dispatch(updateTask(projectId, taskId, editedTask));
            const updatedTasks: ITask[] = tasks.map(task =>
                task.id === taskId ? editedTask : task,
            );
            updateProjectsInLocalstorage(projects, projectId, updatedTasks);
        }
    };

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const trimmedCommentText = commentText.trim();
        if (trimmedCommentText === '') {
            return;
        }
        if (task) {
            const editedTask = {
                ...task,
                comments: [
                    {
                        id: uuidv4(),
                        text: trimmedCommentText,
                        replies: [],
                    },
                    ...task.comments,
                ],
            };
            dispatch(updateTask(projectId, taskId, editedTask));
            const updatedTasks: ITask[] = tasks.map(task =>
                task.id === taskId ? editedTask : task,
            );
            updateProjectsInLocalstorage(projects, projectId, updatedTasks);
            setReplies(editedTask.comments);
        }
        setCommentText('');
    };

    const taskComments = task?.comments && (
        <CommentsList comments={task.comments} addReply={addReply} />
    );

    return createPortal(
        <div className="backdrop" onClick={evt => handleBackdropClick(evt, onClose)}>
            <div className="modal-comments">
                <CloseBtn onClose={onClose} />
                <CommentForm
                    commentText={commentText}
                    setCommentText={setCommentText}
                    onSubmit={handleSubmit}
                />
                {taskComments}
            </div>
        </div>,
        modalCommentsRoot,
    );
};

export default ModalComments;
