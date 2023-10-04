import { IComment } from "../../types"
import Comment from "./Comment";

interface CommentsProps {
    comments: IComment[];
    addReply: (replyText: string, replyId: string) => void;
}
const CommentsList = ({ comments, addReply }: CommentsProps) => {
    return (
        <ul className="modal-comments-list">
            {comments.map((reply, index) => (
                <li className='modal-comments-item' key={`${reply}-${index}`}>
                    <Comment comment={reply} addReply={addReply}/>
                </li>
            ))}
        </ul>
    )
}

export default CommentsList;