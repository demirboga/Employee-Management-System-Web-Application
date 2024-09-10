import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {changeDirector, changeManager} from "../service/EmployeeService.js";

const ChangeProjectManager=({employees, onSelectEmployee, projectId, modalId,refreshProjects})=>{
    const[manager,setManager]=useState(null);
    const navigate=useNavigate()
    const [activeIndex, setActiveIndex] = useState(null);

    const handleItemClick = (index, employee) => {
        setActiveIndex(index); // Update the active item index
        setManager(employee);  // Set the selected manager
    };
    function handleManager() {
        if (manager) {
            changeDirector(projectId, manager)
                .then((response) => {
                    refreshProjects(); // Re-fetch all departments
                })
                .catch((error) => console.error('Error changing manager:', error));
        }
    }
    return (
        <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="employeeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="employeeModalLabel">Select a Manager</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <ul className="list-group ">
                            {employees.length > 0 ? (
                                employees.map((employee, index) => (
                                    <li
                                        key={employee.id}
                                        className={`list-group-item ${index === activeIndex ? 'active' : ''}`}
                                        onClick={() => handleItemClick(index, employee)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {employee.firstName} {employee.lastName}
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item">No employees available</li>
                            )}
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleManager}>Select</button>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default ChangeProjectManager;