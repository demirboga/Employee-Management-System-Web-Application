import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {addEmployeeToProject, changeDirector} from "../service/EmployeeService.js";

const AssignEmployeeToProjectComponent=({ employees, projectId, modalId, refreshEmployeesInProject })=>{
    const[employeeToAdd,setEmployeeToAdd]=useState(null);
    const [jobTitle, setJobTitle] = useState("");
    const navigate=useNavigate()
    const [activeIndex, setActiveIndex] = useState(null);

    const jobTitles = ["Developer", "Manager", "Designer", "Tester","Analyst"];

    const handleItemClick = (index, employee) => {
        setActiveIndex(index); // Update the active item index
        setEmployeeToAdd(employee);  // Set the selected manager
    };
    const handleJobTitleChange = (event) => {
        setJobTitle(event.target.value);  // Update the selected job title
    };
    function handleNewEmployee() {
        if (employeeToAdd&&jobTitle) {
            const updatedEmployee = {
                ...employeeToAdd,
                jobTitle: jobTitle  // Add the selected job title to the employee object
            };
            addEmployeeToProject(projectId, updatedEmployee)
                .then((response) => {
                    refreshEmployeesInProject(); // Re-fetch all departments
                })
                .catch((error) => console.error('Error adding employee:', error));
        }
    }
    return (
        <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="employeeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="employeeModalLabel">Assign an Employee</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <ul className="list-group">
                            {employees.length > 0 ? (
                                employees.map((employee, index) => (
                                    <li
                                        key={employee.id}
                                        className={`list-group-item ${index === activeIndex ? 'active' : ''}`}
                                        onClick={() => handleItemClick(index, employee)}
                                        style={{cursor: 'pointer'}}
                                    >
                                        {employee.firstName} {employee.lastName}
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item">No employees available</li>
                            )}
                        </ul>
                        <div className="mt-3">
                            <label htmlFor="jobTitle" className="form-label">Select Job Title</label>
                            <select id="jobTitle" className="form-select" value={jobTitle}
                                    onChange={handleJobTitleChange}>
                                <option value="">Select a job title</option>
                                {jobTitles.map((title, index) => (
                                    <option key={index} value={title}>{title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                onClick={handleNewEmployee}>Assign
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default AssignEmployeeToProjectComponent