import { useAppSelector } from '../redux/redux-hooks';
import { getProjects } from '../redux/selectors';
import { saveToLocalStorage } from '../utils/localStorageOperations';
import ProjectCard from '../components/ProjectCard';

const ProjectsPage = () => {
    const projects = useAppSelector(getProjects);
    saveToLocalStorage("projects", JSON.stringify(projects));

    return (
        <div className="project-page">
            <div className="container">
                <h2>Select your project</h2>
                <ul className="projects-list">
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ProjectsPage;