import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useAppSelector } from "../../redux/redux-hooks";
import { getFilteredTasks } from "../../redux/selectors";
import { TaskStatus } from "../../types";
import TaskCard from "../taskCard/TaskCard";

interface BoardColumnProps {
    status: TaskStatus;
}

const BoardColumn = ({ status }: BoardColumnProps) => {
    const tasks = useAppSelector(getFilteredTasks);
    const tasksByStatus = tasks?.filter(task => task.status === status);
    
    const taskCards = tasksByStatus?.map((task, taskIndex) => (
        <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
            {(provided) => (
                <div key={task.id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <TaskCard task={task} />
                </div>
            )}
        </Draggable>)
    );

    return (
        <div className="board-column">
            <p className="board-column-title">{status}</p>
            <Droppable droppableId={status}>
                {(provided) => (
                    <div className="tasks-list"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {taskCards}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>      
    )
}

export default BoardColumn;