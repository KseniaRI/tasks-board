import { MouseEvent } from 'react';
import { IComment, ITask } from '../types';

export const handleBackdropClick = (evt: MouseEvent<HTMLDivElement>, onClose: () => void) => {
    if (evt.currentTarget === evt.target) {
        onClose();
    }
};

export const countComments = (task: ITask ): number => {
    return task.comments.reduce((count, comment) => count + countReplies(comment.replies), task.comments.length);
}
    
const countReplies = (comments: IComment[]): number => {
    return comments.reduce((count, comment) => count + 1 + countReplies(comment.replies), 0);
}