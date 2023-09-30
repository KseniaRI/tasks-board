import { DragDropContext } from "react-beautiful-dnd";
// import { DropResult } from "react-beautiful-dnd";
import { ITask, TaskStatus } from "../types";
import BoardColumn from "./BoardColumn";
import { useAppDispatch, useAppSelector } from "../redux/redux-hooks";
import { getProjects, getSelectedProjectId, getTasksOfSelectedProject } from "../redux/selectors";
import { updateTask } from "../redux/actions";
import moment from "moment";

const Board = () => {
    const taskStatuses = Object.values(TaskStatus);

    const projects = useAppSelector(getProjects);
    const tasks = useAppSelector(getTasksOfSelectedProject);
    const selectedProjectId = useAppSelector(getSelectedProjectId);
    const dispatch = useAppDispatch();

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
            dispatch(updateTask(selectedProjectId, draggableId, movedTask));

            const updatedTasks = tasks.map(task => (task.id === movedTask.id ? movedTask : task));
            const updatedProjects = projects.map(project => {
                if (project.id !== selectedProjectId) {
                    return project;
                } else {
                    return {
                        ...project,
                        tasks: updatedTasks
                    }
                }
            })
            
            localStorage.setItem("projects", JSON.stringify(updatedProjects));
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