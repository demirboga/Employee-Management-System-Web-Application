import React from "react";
import {useLocation, useNavigate} from "react-router-dom";

const JobDetailsComponent=()=>{
    const navigator=useNavigate()
    const location = useLocation();
    const { employee } = location.state || {};


    function goBack(){
        navigator("/employees")
    }

    return (
        <div className={"container"}>
            <br /><br /><br />
            <button className={"btn btn-primary mb-2"} onClick={goBack}>Back</button>
            <div className={"row"}>
                <div className={"card col-md-6 offset-md-3 offset-md-3"}>
                    <h2 className={"text-center"}>Job Details:</h2>
                    <div className={"card-body"}>
                        <form>
                            <div className={"form-group mb-2"}>
                                <label className={"form-label"}>Department Name:</label>
                                <input type="text" className="form-control" value={employee.department?.departmentName || "None"} readOnly />
                            </div>

                            <div className={"form-group mb-2"}>
                                <label className={"form-label"}>Job Title:</label>
                                <input type="text" className="form-control" value={employee.jobTitle || "None"} readOnly />
                            </div>

                            <div className={"form-group mb-2"}>
                                <label className={"form-label"}>Current Projects:</label>
                                <ul className="list-group">
                                    {employee.projects.map((project, index) => (
                                        <li key={index} className="list-group-item">
                                            {project.projectName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default JobDetailsComponent