import { FormEvent } from 'react';
import Board from "../components/Board";
import { useAppDispatch, useAppSelector } from "../redux/redux-hooks";
import { getModalIsOpen, getSelectedProject, getTasksOfSelectedProject } from "../redux/selectors";
import {  MdOutlineAddToPhotos, MdSearch} from "react-icons/md";
import ModalTask from "../components/ModalTask";
import { setModalIsOpen, setSearchValue } from "../redux/actions";

const TasksPage = () => {
    const selectedProject = useAppSelector(getSelectedProject);
    const tasks = useAppSelector(getTasksOfSelectedProject);
    const modalIsOpen = useAppSelector(getModalIsOpen);
    const dispatch = useAppDispatch();

    const handleInputChange = (evt: FormEvent<HTMLInputElement>) => {
        const { value } = evt.currentTarget;
        dispatch(setSearchValue(value));
    }

    if (selectedProject) {
        return (
            <>
                <div className="tasks-page">
                    <div className="container tasks-container">
                        <div className="project-title-wrap">
                            <h1 className="project-title">{selectedProject.name}</h1>
                             <button className="add-task-btn" onClick={()=>dispatch(setModalIsOpen(true))}>
                                <MdOutlineAddToPhotos /> 
                                Add tasks
                            </button>
                        </div>
                        {tasks.length > 0 && 
                            <div className="search-wrap">
                                <input className="task-search"
                                    name="title"
                                    type="text"
                                    placeholder="Search by title or number of task"
                                    onChange={handleInputChange}
                                />
                                <button className="search-btn">
                                    <MdSearch />
                                </button>
                            </div> 
                        }
                        <Board/>
                    </div>
                </div>
                {modalIsOpen && <ModalTask/>}
            </>
        )
    } else {
        return <p>No project was selected</p>
    }
}

export default TasksPage;