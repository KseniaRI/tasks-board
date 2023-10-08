import { FormEvent, useState } from 'react';
import { BsSendPlus } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { IComment } from "../../types";
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';

interface CommentProps{
    comment: IComment;
    addReply: (replyText: string, replyId: string) => void;
}

const Comment = ({ comment, addReply }: CommentProps) => {
    const [replyText, setReplyText] = useState('');
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showReplies, setShowReplies] = useState(false);

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const trimmedReplyText = replyText.trim(); 
        if (trimmedReplyText === "") {
            return;
        }
        addReply(trimmedReplyText, comment.id);  
        setShowReplyForm(false);
        setReplyText('');
    }

    const showRepliesBtnContent = showReplies ?
        <span className='toogle-label'><MdOutlineKeyboardArrowUp size={20}/>hide replies</span> :
        <span className='toogle-label'><MdOutlineKeyboardArrowDown size={20}/>show replies</span>;
    
    return (
        <div className='comment'>
            <p className='comment-text'>{comment.text}</p>
            <button className="comment-reply-btn" onClick={()=>setShowReplyForm(!showReplyForm)}>
                <BsSendPlus size={20}/>Replay
            </button>
            {showReplyForm && (
                <CommentForm
                    commentText={replyText}
                    setCommentText={setReplyText}
                    onSubmit={handleSubmit}
                />
            )}
            {comment.replies.length > 0 && (
                <button className="comment-toggle-replies" onClick={()=>setShowReplies(!showReplies)}>
                    {showRepliesBtnContent}
                </button>
            )}
            {(showReplies && comment.replies.length > 0) && (
                <CommentsList comments={comment.replies} addReply={addReply}/>
            )}
        </div>
    )
}

export default Comment;