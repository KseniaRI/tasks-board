import { IComment } from "../../types"
import Comment from "./Comment";

interface CommentsProps {
    comments: IComment[];
    addReply: (replyText: string, replyId: string) => void;
}
const CommentsList = ({ comments, addReply }: CommentsProps) => {
    return (
        <ul className="modal-comments-list">
            {comments.map(reply => (
                <li className='modal-comments-item' key={reply.id}>
                    <Comment comment={reply} addReply={addReply}/>
                </li>
            ))}
        </ul>
    )
}

export default CommentsList;