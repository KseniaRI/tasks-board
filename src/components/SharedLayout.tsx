import { Suspense, useEffect } from "react";
import { Outlet, NavLink } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "../redux/redux-hooks";
import { setProjects, setSelectedProjectId } from "../redux/actions";

const SharedLayout = () => {
    const dispatch = useAppDispatch();
    const storedSelectedProjectId = localStorage.getItem("selectedProjectId");
    const storedProjects = localStorage.getItem("projects");
    
    useEffect(() => {
        if (storedProjects) {
            dispatch(setProjects(JSON.parse(storedProjects)));
        }
        
        if (storedSelectedProjectId) {
            dispatch(setSelectedProjectId(storedSelectedProjectId));
        }  
    },[storedProjects, storedSelectedProjectId, dispatch])

    return (
        <div className="layout-container">
            <header className="header">
                <div className="container">
                    <NavLink to='/'>
                        <p className="logo">Tasks Board</p>
                    </NavLink>
                </div>
            </header>
            <Suspense fallback={null}>
                <Outlet/>
            </Suspense>
            <footer className="footer">
                <div className="container">
                    <p className="footer-text">© 2023 created by KseniaRI</p>
                </div>
            </footer>
            <ToastContainer />
        </div>
    )
}

export default SharedLayout;