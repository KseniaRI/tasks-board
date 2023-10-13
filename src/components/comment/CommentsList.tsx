import { IComment } from "../../types"
import Comment from "./Comment";

interface CommentsProps {
    comments: IComment[];
    addReply: (replyText: string, replyId: string) => void;
}
const CommentsList = ({ comments, addReply }: CommentsProps) => {

    const commentsItems = comments.map(reply => (
        <li className='modal-comments-item' key={reply.id}>
            <Comment comment={reply} addReply={addReply} />
        </li>
    ));

    return (
        <ul className="modal-comments-list">
            {commentsItems}
        </ul>
    )
}

export default CommentsList;