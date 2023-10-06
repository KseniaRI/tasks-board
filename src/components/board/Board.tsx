import { DragDropContext } from "react-beautiful-dnd";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { getProjects, getSelectedProjectId, getTasksOfSelectedProject } from "../../redux/selectors";
import { updateTask } from "../../redux/actions";
import { updateProjectsInLocalstorage } from "../../utils/localStorageOperations";
import { ITask, TaskStatus } from "../../types";
import BoardColumn from "./BoardColumn";

const Board = () => {
    const tasks = useAppSelector(getTasksOfSelectedProject);
    const projects = useAppSelector(getProjects);
    const projectId = useAppSelector(getSelectedProjectId);
    const dispatch = useAppDispatch();

    const taskStatuses = Object.values(TaskStatus);

    const onDragEnd = (result: any) => {
        const { draggableId, destination } = result;
        if (!destination) {
            return;
        }
        const draggableTask = tasks.find(task => task.id === draggableId);
        const updatedTaskStatus: TaskStatus = destination.droppableId;
        const finishedAt = destination.droppableId === TaskStatus.DONE ? moment().format() : null;
        
        if (draggableTask) {
            const movedTask: ITask = {
                ...draggableTask,
                status: updatedTaskStatus,
                finishedAt
            }
            dispatch(updateTask(projectId, draggableId, movedTask));
            const updatedTasks = tasks.map(task => task.id === movedTask.id ? movedTask : task);
            updateProjectsInLocalstorage(projects, projectId, updatedTasks);
        }
    };

    return (
        <div className="board">
            <DragDropContext onDragEnd={onDragEnd}>
                {taskStatuses.map(status => (
                    <BoardColumn key={status} status={status} />
                ))}
            </DragDropContext>
        </div>            
    )
}

export default Board;