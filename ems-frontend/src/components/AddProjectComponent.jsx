import ManagerSelectComponent from "./ManagerSelectComponent.jsx";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {addDepartment, createProject, getAllDepartments, listEmployees} from "../service/EmployeeService.js";
import DepartmentSelectComponent from "./DepartmentSelectComponent.jsx";

const AddProjectComponent=()=>{
    const [projectName,setProjectName]=useState("");
    const [projectDescription,setProjectDescription]=useState("");
    const [selectedManager, setSelectedManager]=useState(null);
    const [employees,setEmployees]=useState([]);
    const [departments,setDepartments]=useState([]);
    const [selectedDepartment,setSelectedDepartment]=useState(null);
    const [errors, setErrors] = useState({
        projectName: "",
        projectDescription:"",
    });


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

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await getAllDepartments();

                if (Array.isArray(response.data)) {
                    setDepartments(response.data);
                } else {
                    console.error('Expected an array of departments but got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, []);

    function goBack(){
        navigator("/projects");
    }

    const handlePName=(e)=>{
        setProjectName(e.target.value)
    }
    const handleProjectDescription=(e)=>{
        setProjectDescription(e.target.value)
    }
    const handleSelectEmployee=(employee)=>{
        setSelectedManager(employee);
    }
    const handleSelectDepartment=(department)=>{
        setSelectedDepartment(department);
    }
    const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors };
        if (projectName.trim()) {
            errorsCopy.projectName = "";
        } else {
            errorsCopy.projectName = "Project name is required";
            valid = false;
        }
        if (projectDescription.trim()) {
            errorsCopy.projectDescription = "";
        } else {
            errorsCopy.projectDescription = "Project Description is required";
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    };

    const addAProject = (e) => {
        e.preventDefault();
        if (!selectedManager) {
            alert("Please select a manager.");
            return;
        }
        const project = {
            projectName,
            projectDescription,
            manager: selectedManager
        };
        if (validateForm()) {
            createProject(selectedDepartment.id,project)
                .then((response) => {
                    console.log(response.data);
                    navigator("/projects");
                })
                .catch((error) => console.error(error));
        }

    };

    return (
        <div className="container">
            <br /><br /><br />
            <button className="btn btn-primary mb-2" onClick={goBack}>Back</button>
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <h2 className="text-center">Add Project</h2>
                    <div className="card-body">
                        <form onSubmit={addAProject}>
                            <div className="form-group mb-2">
                                <label className="form-label">Project Name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter Project Name"
                                    name="projectName"
                                    value={projectName}
                                    className={`form-control ${errors.projectName ? 'is-invalid' : ''}`}
                                    onChange={handlePName}
                                />
                                {errors.projectName && <div className="invalid-feedback">{errors.projectName}</div>}
                            </div>
                            <br/>
                            <div className="form-group mb-2">
                                <label className="form-label">Project Description:</label>
                                <input
                                    type="text"
                                    placeholder="Enter Project Description"
                                    name="projectDescription"
                                    value={projectDescription}
                                    className={`form-control ${errors.projectDescription ? 'is-invalid' : ''}`}
                                    onChange={handleProjectDescription}
                                />
                                {errors.projectDescription && <div className="invalid-feedback">{errors.projectDescription}</div>}
                            </div>
                            <br></br>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#employeeModal">
                                Add Manager
                            </button>

                            <ManagerSelectComponent employees={employees} onSelectEmployee={handleSelectEmployee}/>

                            {selectedManager && (
                                <div className="mt-3">
                                    <h5>Selected Manager:</h5>
                                    <p>{selectedManager.firstName} {selectedManager.lastName}</p>
                                </div>
                            )}

                            <br></br>
                            <br></br>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#departmentModal">
                                Choose Department
                            </button>

                            <DepartmentSelectComponent departments={departments} onSelectDepartment={handleSelectDepartment}/>

                            {selectedDepartment && (
                                <div className="mt-3">
                                    <h5>Selected Department:</h5>
                                    <p>{selectedDepartment.departmentName}</p>
                                </div>
                            )}

                            <br/>
                            <br></br>
                            <button type="submit" className="btn btn-secondary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddProjectComponent