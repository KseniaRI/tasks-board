import { useEffect } from 'react';
import { useAppSelector } from '../redux/redux-hooks';
import { getProjects } from '../redux/selectors';
import { saveToLocalStorage } from '../utils/localStorageOperations';
import ProjectCard from '../components/ProjectCard';

const ProjectsPage = () => {
    const projects = useAppSelector(getProjects);

    useEffect(() => {
        saveToLocalStorage("projects", JSON.stringify(projects));
    }, [projects])
    
    const projectsCards = projects.map(project => (
        <ProjectCard key={project.id} project={project} />
    ));

    return (
        <div className="project-page">
            <div className="container">
                <h2>Select your project</h2>
                <ul className="projects-list">
                    {projectsCards}
                </ul>
            </div>
        </div>
    )
}

export default ProjectsPage;