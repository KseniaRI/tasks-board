import { FormEvent } from 'react';

interface CommentFormProps {
    commentText: string,
    setCommentText: (value: string) => void; 
    onSubmit: (evt: FormEvent<HTMLFormElement>) => void;
}

const CommentForm = ({ commentText, setCommentText, onSubmit }: CommentFormProps) => {
    return (
        <form className='modal-comments-form' onSubmit={onSubmit}>
            <input
                autoComplete="off"
                className='modal-comments-input'
                type="text"
                placeholder="Write comment"
                value={commentText}
                onChange={(evt) => setCommentText(evt.target.value)}
                required
            />
            <input className='modal-comments-button' type="submit" value='Save'/>
        </form>
    )
}

export default CommentForm;