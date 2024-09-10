import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ChangeManagerComponent from "./ChangeManagerComponent.jsx";
import {
    deleteDepartment,
    deleteProject,
    getAllDepartments,
    getAllProjects,
    listEmployees
} from "../service/EmployeeService.js";
import ChangeProjectManager from "./ChangeProjectManager.jsx";
const ProjectsComponent =()=>{
    const [projects,setProjects]=useState([]);
    const [employees,setEmployees]=useState([]);
    const [departments,setDepartments]=useState();
    const [projectName,setProjectName]=useState("");
    const [projectDescription,SetProjectDescription]=useState("");
    const [projectManager,setProjectManager]=useState(null);
    const {projectId}=useParams();
    const navigator=useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await listEmployees();
                console.log('Fetched employees response:', response);

                if (Array.isArray(response.data)) {
                    setEmployees(response.data);
                } else {
                    console.error('Expected an array of employees but got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
        console.log("employees fetched")
    }, []);

    useEffect(()=>{
        getAllProjects1();
    },[])

function goBack(){
    navigator("/")
}
function addNewProject(){
    navigator("/add-project",{state:{projectId}})
}

    const handleSelectEmployee = (employee) => {
        setProjectManager(employee);
        console.log("manager",employee)

    };
function getAllProjects1(){
    getAllProjects().then((response) =>{
        setProjects(response.data);
    }).catch(error =>{
        console.error(error);
    })
}
function goToPEmployees(projectId){
    navigator("/project-employees",{state: {projectId}})
}
const deleteAProject=(id)=>{
    deleteProject(id).then((response)=>{
        getAllProjects1();
    }).catch(error=>console.error(error));
}

return (
    <div className={"container"}>
        <h2 className={"text-center"}>List of Projects</h2>
        <button className={"btn btn-primary mb-2"} onClick={goBack}>Back</button>
        <br></br>
        <button className={"btn btn-secondary mb-2"} onClick={addNewProject}>Add Project</button>
        <table className={"table table-striped table-bordered"}>
            <thead>
            <tr>
                <th>Project ID</th>
                <th>Project Name</th>
                <th>Project Director</th>
                <th>Associated Department</th>
                <th>Number of Assigned Employees</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
                projects.map(project =>
                    <tr key={project.id}>
                        <td>{project.id}</td>
                        <td>{project.projectName}</td>
                        <td>{project.manager.firstName + " " + project.manager.lastName}
                            <span style={{marginLeft: "20px"}}></span>
                            <button className={"btn btn-outline-primary btn-sm"} data-bs-toggle="modal"
                                    data-bs-target={`#employeeModal-${project.id}`}>Change>>
                            </button>
                            <ChangeProjectManager
                                employees={employees}
                                onSelectEmployee={handleSelectEmployee}
                                projectId={project.id}
                                modalId={`employeeModal-${project.id}`}
                                refreshProjects={getAllProjects1}/>
                        </td>
                        <td>{project.department.departmentName}</td>
                        <td>{project.employees.length}
                            <span style={{marginLeft: "100px"}}></span>
                            <button className={"btn btn-outline-primary btn-sm"}
                                    onClick={() => goToPEmployees(project.id)}>Go to>>
                            </button>
                        </td>
                        <td>
                                                        <button className={"btn btn-primary mb-2"}
                                    onClick={() => deleteAProject(project.id)}>Delete
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
export default ProjectsComponent