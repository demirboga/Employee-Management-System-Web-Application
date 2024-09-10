/*import React from "react";

function ListEmployeeComponent(){
    return(
        <div>ListEmployeeComponent</div>
    )
}

export default ListEmployeeComponent*/

import React, {useEffect, useState} from "react";
import {deleteEmployee, getAllContacts, listContacts, listEmployees} from "../service/EmployeeService.js";
import {useNavigate} from "react-router-dom";


const ListEmployeeComponent=() => {
    const [employees,setEmployee]=useState([])
    const [firstName, setFirstName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    useEffect(() => {
        getAllEmployees();

    }, [])


    const navigator=useNavigate();

    function addNewEmployee(){
        navigator("/add-employee")
    }
    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }
    function removeEmployee(id){
        console.log(id);
        deleteEmployee(id).then((response)=>{
            getAllEmployees();
        }).catch(error=>console.error(error));
    }
    function getAllEmployees(){
        listEmployees().then((response) =>{
            setEmployee(response.data);
        }).catch(error =>{
            console.error(error);
        })
    }
    const handleSearch = (e) => {
        setFirstName(e.target.value);
    };
    function findByName(employeeName){
        navigator("/find-employee",{state:{firstName,employeeId}})

    }
    function getAllContacts(id){
        navigator(`/all-contacts/${id}`)
    }
    function goBack(){
        navigator("/")
    }
    function viewJobDetails(employee) {
        navigator("/job-details", { state: { employee } });
    }

    return (
        <div className="container">
            <h2 className={"text-center"}>List of Employees</h2>
            <button className={"btn btn-primary mb-2"} onClick={goBack}>Back</button>
            <br></br>
            <button className={"btn btn-secondary mb-2"} onClick={addNewEmployee}>Add Employee</button>
            <span style={{marginRight: "10px"}}></span>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Employee First Name"
                       aria-label="Employee First Name" aria-describedby="basic-addon2"
                       value={firstName}
                       onChange={handleSearch}/>
                <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon2" onClick={findByName}>Search</span>
                </div>
            </div>

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
                                <span style={{marginRight:"10px"}}></span>
                                <button className={"btn btn-primary"}
                                        onClick={() => viewJobDetails(employee)}>Job Details
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
export default ListEmployeeComponent

