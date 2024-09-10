import React, {useEffect, useState} from 'react';


const ManagerSelectComponent = ({ employees, onSelectEmployee }) => {
    const[manager,setManager]=useState(null);

    function handleManager(e){
        setManager(e.target.value);
    }
    return (
        <div className="modal fade" id="employeeModal" tabIndex="-1" aria-labelledby="employeeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="employeeModalLabel">Select a Manager</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <ul className="list-group">
                            {employees.length > 0 ? (
                                employees.map((employee) => (
                                    <li
                                        key={employee.id}
                                        className="list-group-item"
                                        onClick={() => onSelectEmployee(employee)}
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
};

export default ManagerSelectComponent;
