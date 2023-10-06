import { FormEvent, ChangeEvent } from 'react';
import { Priority } from "../../types";

interface IDefaultValues {
    title: string | undefined,
    description: string | undefined,
    priority: string | undefined
}

interface TaskFormProps {
    handleSubmit: (evt: FormEvent<HTMLFormElement>) => void;
    handleInputChange: (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleUpload?: (evt: ChangeEvent<HTMLInputElement>) => void;
    defaultValues?: IDefaultValues;
    type: 'Edit task' | 'Add task' | 'Add subtask';
}

const TaskForm = ({handleSubmit, handleInputChange, handleUpload, defaultValues, type }: TaskFormProps) => {
    const priorities = Object.values(Priority);
    const priorityOptions = priorities.map(priority => (
        <option key={priority} value={priority}>{priority}</option>
    ));

    return (
        <form className="modal-task-form" onSubmit={handleSubmit}>
            <div className="form-field-wrap">
                <label className="form-label" htmlFor="title">
                    {type !== 'Add subtask' ? 'Task title:' : 'Subtask title:'}
                </label>
                <input
                    className="form-field"
                    name="title"
                    id="title"
                    type="text"
                    onChange={handleInputChange}
                    defaultValue={defaultValues?.title}
                    maxLength={40}
                    required
                />
            </div>
            <div className="form-field-wrap">
                <label className="form-label" htmlFor="description">
                    {type !== 'Add subtask' ? 'Task description:' : 'Subtask description:'}
                </label>
                <textarea
                    className="form-field"
                    name="description"
                    id="description"
                    onChange={handleInputChange}
                    defaultValue={defaultValues?.description}
                    maxLength={150}
                    required
                />
            </div>
            {type !== 'Add subtask' && (
                <>
                    <div className="form-field-wrap">
                        <label className="form-label" htmlFor="priority">
                            Task priority:
                        </label>
                        <select
                            className="form-field"
                            name="priority"
                            id="priority"
                            onChange={handleInputChange}
                            defaultValue={defaultValues?.priority || Priority.LOW}
                            required
                        >
                            {priorityOptions}
                        </select>
                    </div>
                    <div className="form-field-wrap">
                        <label className="form-label" htmlFor="file">
                            Attach file:
                        </label> 
                        <input
                            className="attach-file-field"
                            type="file"
                            name="file"
                            id="file"
                            onChange={handleUpload}
                            accept=".jpg, .jpeg, .png"
                        />
                    </div>
                </>
            )}
            <button className="modal-task-submit" type="submit">
               {type}
            </button>
        </form>
    )
}

export default TaskForm;