import moment from "moment";
import { ITask, TaskStatus } from "../../types";
import { useEffect, useState } from "react";

interface TaskCardDatesProps {
    task: ITask;
}

const TaskCardDates = ({ task }: TaskCardDatesProps) => {
    const { createdAt, finishedAt, status } = task;

    const [timeDiff, setTimediff] = useState(0);
    const [timeUnit, setTimeUnit] = useState('minutes');

    useEffect(() => {
        const startDate = moment(createdAt);
        const endDate = finishedAt ? moment(finishedAt) : moment();
        const timeDiffMinutes = endDate.diff(startDate, 'minutes');
        const timeDiffHours = endDate.diff(startDate, 'hours');
        const timeDiffDays = endDate.diff(startDate, 'days');

        if (timeDiffMinutes < 60) {
            setTimediff(timeDiffMinutes);
            setTimeUnit('minutes');
        } else if (timeDiffHours < 24) {
            setTimediff(timeDiffHours);
            setTimeUnit('hours');
        } else {
            setTimediff(timeDiffDays);
            setTimeUnit('days');
        }
    }, [createdAt, finishedAt]);
    
    return (
        <div className="task-dates-wrap">
            <span className="task-card-date">
                {`Created at: ${moment(createdAt).format('YYYY-MM-DD h:mm')}`}
            </span>
            {status !== TaskStatus.QUEUE && (
            <span className="task-card-date">
                    {`In work: ${timeDiff} ${timeUnit}`}
            </span>
            )}
            {status === TaskStatus.DONE && (
                <span className="task-card-date">
                    {`Finished at: ${moment(finishedAt).format('YYYY-MM-DD h:mm')}`}
                </span>
            )}
        </div>
    )
}

export default TaskCardDates;