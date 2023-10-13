import { NavLink } from 'react-router-dom';
import { MdOutlineAddToPhotos} from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../redux/redux-hooks";
import { setModalTaskIsOpen, setSearchValue } from "../redux/actions";
import {
    getModalCommentsIsOpen,
    getModalFilesIsOpen,
    getModalSubtaskIsOpen,
    getModalTaskIsOpen,
    getSelectedProject,
    getTasksOfSelectedProject
} from "../redux/selectors";
import ModalFiles from '../components/modals/ModalFiles';
import ModalComments from '../components/modals/ModalComments';
import ModalTask from "../components/modals/ModalTask";
import ModalSubtask from '../components/modals/ModalSubtask';
import SearchField from '../components/SearchField';
import Board from "../components/board/Board";

const TasksPage = () => {
    const selectedProject = useAppSelector(getSelectedProject);
    const tasks = useAppSelector(getTasksOfSelectedProject);
    const modalTaskIsOpen = useAppSelector(getModalTaskIsOpen);
    const modalFilesIsOpen = useAppSelector(getModalFilesIsOpen);
    const modalCommentsIsOpen = useAppSelector(getModalCommentsIsOpen);
    const modalSubtaskIsOpen = useAppSelector(getModalSubtaskIsOpen);
    const dispatch = useAppDispatch();

    const hasTasks = tasks.length > 0;
    const searchField = hasTasks && <SearchField onChange={(evt) => dispatch(setSearchValue(evt.currentTarget.value))} />;

    if(selectedProject) {
        return (
            <>
                <div className="tasks-page">
                    <div className="container tasks-container">
                        <div className="project-title-wrap">
                            <h1 className="project-title">{selectedProject.name}</h1>
                             <button className="add-task-btn" onClick={()=>dispatch(setModalTaskIsOpen(true))}>
                                <MdOutlineAddToPhotos />Add tasks
                            </button>
                        </div>
                        {searchField}
                        <Board/>
                    </div>
                </div>
                {modalTaskIsOpen && <ModalTask />}
                {modalFilesIsOpen && <ModalFiles />}
                {modalCommentsIsOpen && <ModalComments />}
                {modalSubtaskIsOpen && <ModalSubtask/>}
            </>
        )
    } else {
        return (
            <NavLink className="task-page-link" to='/'>First select project</NavLink>
        )
    }
}

export default TasksPage;