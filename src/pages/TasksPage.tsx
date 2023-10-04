import { FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { MdOutlineAddToPhotos} from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../redux/redux-hooks";
import { setModalTaskIsOpen, setSearchValue } from "../redux/actions";
import {
    getModalCommentsIsOpen,
    getModalFilesIsOpen,
    getModalTaskIsOpen,
    getSelectedProject,
    getTasksOfSelectedProject
} from "../redux/selectors";

import ModalFiles from '../components/modals/ModalFiles';
import ModalComments from '../components/modals/ModalComments';
import ModalTask from "../components/modals/ModalTask";
import SearchField from '../components/SearchField';
import Board from "../components/board/Board";

const TasksPage = () => {
    const selectedProject = useAppSelector(getSelectedProject);
    const tasks = useAppSelector(getTasksOfSelectedProject);
    const modalTaskIsOpen = useAppSelector(getModalTaskIsOpen);
    const modalFilesIsOpen = useAppSelector(getModalFilesIsOpen);
    const modalCommentsIsOpen = useAppSelector(getModalCommentsIsOpen);
    const dispatch = useAppDispatch();

    const handleInputChange = (evt: FormEvent<HTMLInputElement>) => {
        const { value } = evt.currentTarget;
        dispatch(setSearchValue(value));
    }
    if(selectedProject) {
        return (
            <>
                <div className="tasks-page">
                    <div className="container tasks-container">
                        <div className="project-title-wrap">
                            <h1 className="project-title">{selectedProject.name}</h1>
                             <button className="add-task-btn" onClick={()=>dispatch(setModalTaskIsOpen(true))}>
                                <MdOutlineAddToPhotos /> 
                                Add tasks
                            </button>
                        </div>
                        {tasks.length > 0 && <SearchField onChange={handleInputChange}/>}
                        <Board/>
                    </div>
                </div>
                {modalTaskIsOpen && <ModalTask />}
                {modalFilesIsOpen && <ModalFiles />}
                {modalCommentsIsOpen && <ModalComments/>}
            </>
        )
    } else {
        return (
            <NavLink className="task-page-link" to='/'>First select project</NavLink>
        )
    }
}

export default TasksPage;