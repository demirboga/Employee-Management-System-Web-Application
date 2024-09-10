import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
    deleteEmployee,
    getEmployees,
    getEmployeesInProject,
    listEmployees,
    removeEmployeeFromProject
} from "../service/EmployeeService.js";
import ChangeProjectManager from "./ChangeProjectManager.jsx";
import AssignEmployeeToProjectComponent from "./AssignEmployeeToProjectComponent.jsx";

const EmployeesInProject=()=>{
    const [projects,setProject]=useState([])
    const[employees,setEmployee]=useState([])
    const [allEmployees,setAllEmployees]=useState([])
    const location = useLocation();
    const { projectId } = location.state || {};

    useEffect(() => {
        getAllEmployeesInProject(projectId);
        fetchAllEmployees();

    }, [projectId])

    function getAllEmployeesInProject(projectId){
        getEmployeesInProject(projectId).then((response) => {
            setEmployee(response.data);
        }).catch(error => {
            console.error(error);
        });
    }
    function fetchAllEmployees() {
        listEmployees().then((response) => {
            setAllEmployees(response.data); // Assuming this fetches all employees
        }).catch(error => {
            console.error(error);
        });
    }



    const navigator=useNavigate();



    function getAllContacts(id){
        navigator(`/all-contacts/${id}`)
    }
    function goBack(){
        navigator("/projects")
    }
    function removeEmployeeP(projectId,employeeId){
        removeEmployeeFromProject(projectId,employeeId).then((response)=>{
            getAllEmployeesInProject(projectId);
        }).catch(error=>{console.error(error)})
    }
    function viewJobDetails(employee) {
        navigator("/job-details", { state: { employee } });
    }

    return (
        <div className="container">
            <h2 className={"text-center"}>List of Employees</h2>
            <button className={"btn btn-primary mb-2"} onClick={goBack}>Back</button>
            <br></br>
            <button className={"btn btn-secondary mb-2"} data-bs-toggle="modal"
                    data-bs-target={`#employeeModal-${projectId}`}>Assign Employee
            </button>
            <AssignEmployeeToProjectComponent
                employees={allEmployees}
                projectId={projectId}
                modalId={`employeeModal-${projectId}`}
                refreshEmployeesInProject={() => getAllEmployeesInProject(projectId)}/>

            <table className={"table table-striped table-bordered"}>
                <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Details</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    employees.map(employee =>
                        <tr key={employee.employeeId}>
                            <td>{employee.employeeId}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>
                                <button className={"btn btn-secondary"}
                                        onClick={() => getAllContacts(employee.employeeId)}>Contact Details
                                </button>
                                <span style={{marginRight: "10px"}}></span>
                                <button className={"btn btn-primary"}
                                        onClick={() => viewJobDetails(employee)}>Job Details
                                </button>

                            </td>
                            <td>
                                <button className={"btn btn-primary mb-2"} onClick={()=>removeEmployeeP(projectId,employee.employeeId)}>Remove</button>
                            </td>

                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}
export default EmployeesInProject