import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import axios from 'axios';
import ManagerSelectComponent from './ManagerSelectComponent.jsx';
import {addDepartment, getContact, listEmployees} from "../service/EmployeeService.js";

const AddDepartmentComponent = () => {
    const [departmentName, setDepartmentName] = useState("");
    const [employees, setEmployees] = useState([]);
    const [selectedManager, setSelectedManager] = useState(null);
    const [manager,setManager]=useState(null);
    const location = useLocation();
    const { departmentId } = location.state || {};
    const [savedDepartmentId,setSavedDepartmentId ]=useState(null)

    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        departmentName: "",
    });

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
        setSavedDepartmentId(departmentId)
    },[departmentId])



    const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors };
        if (departmentName.trim()) {
            errorsCopy.departmentName = "";
        } else {
            errorsCopy.departmentName = "Department name is required";
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    };

    const handleSelectEmployee = (employee) => {
        setSelectedManager(employee);
        console.log("manager",employee)

    };


    const addADepartment = (e) => {
        e.preventDefault();
        if (!selectedManager) {
            alert("Please select a manager.");
            return;
        }
        const department = {
            departmentName,
            manager: selectedManager
        };
        if (validateForm()) {
            console.log(department.manager)
            addDepartment(department)
                .then((response) => {
                    console.log(response.data);
                    navigate("/departments");
                })
                .catch((error) => console.error(error));
        }

    };

    const handleDName = (e) => {
        setDepartmentName(e.target.value);
    };

    const goBack = () => {
        navigate("/departments");
    };

    return (
        <div className="container">
            <br /><br /><br />
            <button className="btn btn-primary mb-2" onClick={goBack}>Back</button>
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <h2 className="text-center">Add Department</h2>
                    <div className="card-body">
                        <form onSubmit={addADepartment}>
                            <div className="form-group mb-2">
                                <label className="form-label">Department Name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter Department Name"
                                    name="departmentName"
                                    value={departmentName}
                                    className={`form-control ${errors.departmentName ? 'is-invalid' : ''}`}
                                    onChange={handleDName}
                                />
                                {errors.departmentName && <div className="invalid-feedback">{errors.departmentName}</div>}
                            </div>
                            <br />
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#employeeModal">
                                Add Manager
                            </button>

                            <ManagerSelectComponent employees={employees} onSelectEmployee={handleSelectEmployee} />

                            {selectedManager && (
                                <div className="mt-3">
                                    <h5>Selected Manager:</h5>
                                    <p>{selectedManager.firstName} {selectedManager.lastName}</p>
                                </div>
                            )}

                            <br />
                            <br></br>
                            <button type="submit" className="btn btn-secondary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddDepartmentComponent;
