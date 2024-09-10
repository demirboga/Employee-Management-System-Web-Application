import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {deleteEmployee, getEmployees, listEmployees} from "../service/EmployeeService.js";

const EmployeesInDepartmentComponent=()=>{
    const [employees,setEmployee]=useState([])
    const [firstName, setFirstName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const location = useLocation();
    const { departmentId } = location.state || {};

    useEffect(() => {
        getAllEmployeesInDepartment(departmentId);

    }, [departmentId])

    function getAllEmployeesInDepartment(departmentId){
        getEmployees(departmentId).then((response) => {
            setEmployee(response.data);
        }).catch(error => {
            console.error(error);
        });
    }


    const navigator=useNavigate();



    function getAllContacts(id){
        navigator(`/all-contacts/${id}`)
    }
    function goBack(){
        navigator("/departments")
    }
    function viewJobDetails(employee) {
        navigator("/job-details", { state: { employee } });
    }

    return (
        <div className="container">
            <h2 className={"text-center"}>List of Employees</h2>
            <button className={"btn btn-primary mb-2"} onClick={goBack}>Back</button>
            <br></br>


            <table className={"table table-striped table-bordered"}>
                <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Details</th>
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

                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}
export default EmployeesInDepartmentComponent