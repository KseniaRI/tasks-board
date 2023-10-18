import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { ITask, TaskStatus } from '../../types';

interface TaskCardDatesProps {
    task: ITask;
}
type TTimeUnit = 'minutes' | 'hours' | 'days';

const TaskCardDates = ({ task }: TaskCardDatesProps) => {
    const { createdAt, finishedAt, status } = task;

    const [timeDiff, setTimediff] = useState(0);
    const [timeUnit, setTimeUnit] = useState<TTimeUnit>('minutes');

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

    const createdAtLabel = `Created at: ${moment(createdAt).format('YYYY-MM-DD h:mm')}`;
    const inWorkLabel = `In work: ${timeDiff} ${timeUnit}`;
    const finishedAtLabel = `Finished at: ${moment(finishedAt).format('YYYY-MM-DD h:mm')}`;

    const inWorkBox = status !== TaskStatus.QUEUE && (
        <span className="task-card-date">{inWorkLabel}</span>
    );

    const finishBox = status === TaskStatus.DONE && (
        <span className="task-card-date">{finishedAtLabel}</span>
    );

    return (
        <div className="task-dates-wrap">
            <span className="task-card-date">{createdAtLabel}</span>
            {inWorkBox}
            {finishBox}
        </div>
    );
};

export default TaskCardDates;
