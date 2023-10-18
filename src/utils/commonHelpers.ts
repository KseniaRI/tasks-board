import { MouseEvent } from 'react';
import { IComment } from '../types';

export const handleBackdropClick = (evt: MouseEvent<HTMLDivElement>, onClose: () => void) => {
    if (evt.currentTarget === evt.target) {
        onClose();
    }
};

// count comments of task on first lavel and call function that count replies
export const countComments = (comments: IComment[]): number => {
    return comments.reduce(
        (count, comment) => count + countReplies(comment.replies),
        comments.length,
    );
};

// count replies and replies of replies
const countReplies = (commentReplies: IComment[]): number => {
    return commentReplies.reduce(
        (count, commentReply) => count + 1 + countReplies(commentReply.replies),
        0,
    );
};
