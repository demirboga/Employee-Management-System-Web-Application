import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {deleteContact, deleteDepartment, getAllDepartments, listEmployees} from "../service/EmployeeService.js";
import ManagerSelectComponent from "./ManagerSelectComponent.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ChangeManagerComponent from "./ChangeManagerComponent.jsx";


const DepartmentsComponent=()=>{
    const {departmentId}=useParams();
    const [departments,setDepartments]=useState([])
    const [departmentName,setDepartmentName]=useState("");
    const [employees,setEmployees]=useState([])
    const [selectedManager,setSelectedManager]=useState(null)
    const [projects,setProjects]=useState([])

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
    }, []);


    useEffect(()=>{
        getAllDepartments1();
    },[])

    function goBack(){
        navigator("/")
    }

    function addNewDepartment(){
        navigator("/add-department",{state:{departmentId}})
    }
    function getAllDepartments1(){
        getAllDepartments().then((response) =>{
            setDepartments(response.data);
        }).catch(error =>{
            console.error(error);
        })
    }
    const deleteAdDepartment=(id)=>{
        console.log(id);
        deleteDepartment(id).then((response)=>{
            getAllDepartments1();
        }).catch(error=>console.error(error));
    }

    const handleSelectEmployee = (employee) => {
        setSelectedManager(employee);
        console.log("manager",employee)

    };
    function goToDEmployees(departmentId){
        navigator("/assigned-employees",{state:{departmentId}})
    }
    function goToDProject(departmentId){
        navigator("/assigned-projects",{state:{departmentId}})
    }


    return(
        <div className={"container"}>
            <h2 className={"text-center"}>List of Departments</h2>
            <button className={"btn btn-primary mb-2"} onClick={goBack}>Back</button>
            <br></br>
            <button className={"btn btn-secondary mb-2"} onClick={addNewDepartment}>Add Department</button>
            <table className={"table table-striped table-bordered"}>
                <thead>
                <tr>
                    <th>Department ID</th>
                    <th>Department Name</th>
                    <th>Department Manager's Name</th>
                    <th>Number of Assigned Projects</th>
                    <th>Number of Assigned Employees</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    departments.map(departments =>
                        <tr key={departments.id}>
                            <td>{departments.id}</td>
                            <td>{departments.departmentName}</td>
                            <td>{departments.manager.firstName +" "+ departments.manager.lastName}
                                <span style={{marginLeft:"20px"}}></span>
                                <button className={"btn btn-outline-primary btn-sm"} data-bs-toggle="modal" data-bs-target={`#employeeModal-${departments.id}`}>Change>></button>
                                <ChangeManagerComponent
                                    employees={employees}
                                    onSelectEmployee={handleSelectEmployee}
                                    departmentId={departments.id}
                                    modalId={`employeeModal-${departments.id}`}
                                    refreshDepartments={getAllDepartments1} />
                            </td>
                            <td>{departments.projects.length}
                                <span style={{marginLeft: "100px"}}></span>
                                <button className={"btn btn-outline-primary btn-sm"} onClick={()=>goToDProject(departments.id)}>Go to>></button>
                            </td>
                            <td>{departments.employees.length}
                                <span style={{marginLeft: "100px"}}></span>
                                <button className={"btn btn-outline-primary btn-sm"} onClick={()=>goToDEmployees(departments.id)} >Go to>></button>
                            </td>
                            <td>
                                <button className={"btn btn-primary mb-2" } onClick={()=>deleteAdDepartment(departments.id)}>Delete</button>
                            </td>

                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )

}
export default DepartmentsComponent