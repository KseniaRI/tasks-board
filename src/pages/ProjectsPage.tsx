import ProjectCard from '../components/ProjectCard';
import { useAppSelector } from '../redux/redux-hooks';
import { getProjects } from '../redux/selectors';

const ProjectsPage = () => {

    const projects = useAppSelector(getProjects);
    localStorage.setItem("projects", JSON.stringify(projects))

    return (
        <div className="project-page">
            <div className="container">
                <h2>Choose your project</h2>
                <ul className="projects-list">
                    {projects.map(project => <ProjectCard key={project.id} project={project}/>)}
                </ul>
            </div>
        </div>
    )
}

export default ProjectsPage;