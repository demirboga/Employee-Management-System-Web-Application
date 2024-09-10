import React, {useEffect, useState} from "react";
import {
    getEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeebyName,
    listEmployees
} from "../service/EmployeeService.js";
import {useLocation, useNavigate, useParams} from "react-router-dom";
const findEmployeeComponent =()=>{
    const navigator=useNavigate()
    const [employees,setEmployee]=useState([])
    const [savedEmployeeId,setSavedEmployeeId]=useState('')
    const location = useLocation();
    const { firstName,employeeId } = location.state || {};
    useEffect(() => {
           getAllEmployeesByName(firstName);

        },[firstName])
    useEffect(()=>{
        if(employeeId) {
            setSavedEmployeeId(employeeId)
        }
    },[employeeId])

    function getAllEmployeesByName(firstName){
        getEmployeebyName(firstName).then((response)=>{
            setEmployee(response.data);
        }).catch(error=>{console.error(error)})
    }
    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }


    const removeEmployee = (id) => {
        console.log(id);
        deleteEmployee(id)
            .then((response) => {
                getAllEmployeesByName(firstName); // Refresh the list of employees
            })
            .catch(error => console.error(error));
    };
    function goBack(){
        navigator(-1)
    }
    const contDetails=(id)=>{
        navigator(`/all-contacts/${id}`)
    }

    return (
        <div className={"container"}>
            <h2 className={"text-center"}>Employees Found: </h2>
            <button className={"btn btn-primary mb-2"} onClick={goBack}>Back</button>
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
                    employees.map( employee=>
                        <tr key={employee.employeeId}>
                            <td>{employee.employeeId}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>
                                <button className={"btn btn-secondary"}
                                        onClick={() => contDetails(employee.employeeId)}>Contact Details
                                </button>
                                <span style={{marginRight: "10px"}}></span>
                                <button className={"btn btn-primary"}
                                        onClick={() => getAllContacts(employee.employeeId)}>Job Details
                                </button>
                            </td>
                            <td>
                                <button className={"btn btn-secondary"}
                                        onClick={() => updateEmployee(employee.employeeId)}>Update
                                </button>
                                <span style={{marginRight: "10px"}}></span>
                                <button className={"btn btn-primary"}
                                        onClick={() => removeEmployee(employee.employeeId)}>Delete
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
export default findEmployeeComponent