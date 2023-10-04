import moment from "moment";
import { ITask, TaskStatus } from "../../types";

interface TaskCardDatesProps {
    task: ITask;
}

const TaskCardDates = ({ task }: TaskCardDatesProps) => {
    const { createdAt, finishedAt, status } = task;

    const startDate = moment(createdAt);
    const endDate = finishedAt ? moment(finishedAt) : moment();
    const timeDiff = endDate.diff(startDate, 'minutes');
    
    return (
        <div className="task-dates-wrap">
            <span className="task-card-date">
                Created at: {moment(createdAt).format('YYYY-MM-DD h:mm')}
            </span>
            {status !== TaskStatus.QUEUE && (
            <span className="task-card-date">
                    In work: {timeDiff} {timeDiff > 1 ? "minutes" : "minute"}
            </span>
            )}
            {status === TaskStatus.DONE && (
                <span className="task-card-date">
                    Finished at: {moment(finishedAt).format('YYYY-MM-DD h:mm')}
                </span>
            )}
        </div>
    )
}

export default TaskCardDates;