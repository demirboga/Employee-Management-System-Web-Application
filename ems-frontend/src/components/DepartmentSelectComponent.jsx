import React, {useState} from "react";

const DepartmentSelectComponent=({departments,onSelectDepartment})=>{
    const[department,setDepartment]=useState(null);

    function handleDepartment(e){
        setDepartment(e.target.value);
    }
    return (
        <div className="modal fade" id="departmentModal" tabIndex="-1" aria-labelledby="departmentModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="departmentModalLabel">Select a Department</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <ul className="list-group">
                            {departments.length > 0 ? (
                                departments.map((department) => (
                                    <li
                                        key={department.id}
                                        className="list-group-item"
                                        onClick={() => onSelectDepartment(department)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {department.departmentName}
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item">No departments available</li>
                            )}
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDepartment}>Select</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DepartmentSelectComponent