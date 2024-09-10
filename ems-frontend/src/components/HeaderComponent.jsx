import React from "react";
import {useNavigate} from "react-router-dom";
const HeaderComponent= () =>
{

    return(
        <div>
            <header>
                <nav className={"navbar navbar-dark bg-dark"}>
                    <a className="navbar-brand" href="http://localhost:3000/home-page"> Employee Management System</a>
                    <div className="navbar-text d-flex align-items-center">
                        <small>
                            {window.location.pathname !== '/login' && (
                                <>
                                    <a className="nav-link d-inline" href="http://localhost:3000/employees">Employees | </a>
                                    <a className="nav-link d-inline" href="http://localhost:3000/departments">Departments | </a>
                                    <a className="nav-link d-inline" href="http://localhost:3000/projects">Projects</a>
                                </>
                            )}
                        </small>
                    </div>
                </nav>
            </header>
        </div>
    )

}
export default HeaderComponent