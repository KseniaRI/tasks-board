import { NavLink } from 'react-router-dom';
import { setSelectedProjectId } from '../redux/actions';
import { useAppDispatch } from '../redux/redux-hooks';
import { IProject } from '../types';

interface ProjectCardProps{
    project: IProject;
}
const ProjectCard = ({ project }: ProjectCardProps) => {
    const { name, author } = project;
    const dispatch = useAppDispatch();

    const onProjectSelect = () => {
        localStorage.setItem("selectedProjectId", project.id);
        dispatch(setSelectedProjectId(project.id));
    }

    return (
        <li className="projects-item">
            <NavLink
                className="project-card"
                to="/tasks"
                onClick={onProjectSelect}
            >
                <p className="project-name">{name}</p>
                <p className='project-author'>author: {author}</p>
            </NavLink>
        </li>
    )
}

export default ProjectCard;