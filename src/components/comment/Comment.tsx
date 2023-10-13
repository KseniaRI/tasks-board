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

    const hasReplies = comment.replies.length > 0;

    const showRepliesIfExist = hasReplies && showReplies;

    const hideIcon = <span className='toogle-label'><MdOutlineKeyboardArrowUp size={20} />hide replies</span>;
    const showIcon = <span className='toogle-label'><MdOutlineKeyboardArrowDown size={20} />show replies</span>;

    const btnIcon = showReplies ? hideIcon : showIcon;
    
    const hideOrShowBtn = <button className="comment-toggle-replies" onClick={()=>setShowReplies(!showReplies)}>{btnIcon}</button>;

    const showRepliesBtn = hasReplies && hideOrShowBtn;

    const replyForm = showReplyForm && <CommentForm commentText={replyText} setCommentText={setReplyText} onSubmit={handleSubmit}/>;

    const commentsList = showRepliesIfExist && <CommentsList comments={comment.replies} addReply={addReply} />;
    
    return (
        <div className='comment'>
            <p className='comment-text'>{comment.text}</p>
            <button className="comment-reply-btn" onClick={()=>setShowReplyForm(!showReplyForm)}>
                <BsSendPlus size={20}/>Replay
            </button>
            {replyForm}
            {showRepliesBtn}
            {commentsList}
        </div>
    )
}

export default Comment;