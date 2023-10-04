import ProjectsPage from './pages/ProjectsPage';
import TasksPage from './pages/TasksPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SharedLayout from './components/SharedLayout';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<ProjectsPage />} />
          <Route path='tasks' element={<TasksPage />} />
        </Route>
        <Route path='*' element={<ProjectsPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
