import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {deleteProject, getAllProjects, getEmployees, getProjectsInDepartment} from "../service/EmployeeService.js";
import ChangeProjectManager from "./ChangeProjectManager.jsx";
import ChangeManagerComponent from "./ChangeManagerComponent.jsx";


const ProjectsInDepartmentComponent=()=>{
    const [projects,setProjects]=useState([]);
    const location = useLocation();
    const { departmentId } = location.state || {};

    const navigator=useNavigate();
    useEffect(() => {
        getAllProjectsInDepartment(departmentId);

    }, [departmentId])

    function getAllProjectsInDepartment(departmentId){
        getProjectsInDepartment(departmentId).then((response) => {
            setProjects(response.data);
        }).catch(error => {
            console.error(error);
        });
    }
    function goBack(){
        navigator("/departments")
    }

    function goToPEmployees(projectId){
        navigator("/project-employees",{state:{projectId}})
    }


    return (
        <div className="container">
            <h2 className={"text-center"}>List of Projects</h2>
            <button className={"btn btn-primary mb-2"} onClick={goBack}>Back</button>
            <br></br>
            <table className={"table table-striped table-bordered"}>
                <thead>
                <tr>
                    <th>Project ID</th>
                    <th>Project Name</th>
                    <th>Project Director</th>
                    <th>Associated Department</th>
                    <th>Number of Assigned Employees</th>
                </tr>
                </thead>
                <tbody>
                {
                    projects.map(project =>
                        <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.projectName}</td>
                            <td>{project.manager.firstName + " " + project.manager.lastName}</td>
                            <td>{project.department.departmentName}</td>
                            <td>{project.employees.length}
                                <span style={{marginLeft: "100px"}}></span>
                                <button className={"btn btn-outline-primary btn-sm"}
                                        onClick={() => goToPEmployees(project.id)}>Go to>>
                                </button>
                            </td>


                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}
export default ProjectsInDepartmentComponent