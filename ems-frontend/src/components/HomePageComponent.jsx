import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from "C:/Users/dboga/Desktop/foto/1111.jfif";
import image2 from "C:/Users/dboga/Desktop/foto/4194.jpg";
import image3 from "C:/Users/dboga/Desktop/foto/2222.jfif";


const HomePageComponent = () => {
    const navigate = useNavigate();
    const [accordionState, setAccordionState] = useState({
        isOpenOne: false,
        isOpenTwo: false,
        isOpenThree: false,
    });

    function goToEmployees() {
        navigate("/employees")
    }

    const toggleAccordion = (key) => {
        setAccordionState(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };
    function goToDepartments(){
        navigate("/departments")
    }
    function goToProjects(){
        navigate("/projects")
    }

    return (
        <div className="container">
            <br />
            <h2 className="text-center">Welcome to the Employee Management System!</h2>
            <br /><br />
            <div className="row justify-content-center ">
                <div className="col-md-5 ">
                    <div className="accordion accordion-flush " id="accordion1">
                        <div className="accordion-item rounded accordion-flush">
                            <h2 className="accordion-header" id="headingOne">
                                <button
                                    className="accordion-button custom-outline rounded"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne"
                                    aria-expanded={accordionState.isOpenOne}
                                    aria-controls="collapseOne"
                                    onClick={() => toggleAccordion('isOpenOne')}
                                >
                                    Employees
                                </button>
                            </h2>
                            <div
                                id="collapseOne"
                                className={`accordion-collapse collapse ${accordionState.isOpenOne ? 'show' : ''}`}
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordion1"
                            >
                                <div className="accordion-body fontcolor">
                                    <strong>This is the Employee section.</strong> You can see the detailed information
                                    about the
                                    employees, their contacts, the departments they work in and the projects they work
                                    at.
                                    <button className="btn btn-sm btn-outline-primary mb-2 float-end"
                                            onClick={goToEmployees}>Click here >></button>
                                </div>
                            </div>
                            <br></br>
                        </div>
                        <div className="accordion-item rounded accordion-flush">
                            <h2 className="accordion-header" id="headingTwo">
                                <button
                                    className="accordion-button custom-outline rounded"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo"
                                    aria-expanded={accordionState.isOpenTwo}
                                    aria-controls="collapseTwo"
                                    onClick={() => toggleAccordion('isOpenTwo')}
                                >
                                    Departments
                                </button>
                            </h2>
                            <div
                                id="collapseTwo"
                                className={`accordion-collapse collapse ${accordionState.isOpenTwo ? 'show' : ''}`}
                                aria-labelledby="headingTwo"
                                data-bs-parent="#accordion1"
                            >
                                <div className="accordion-body fontcolor">
                                    <strong>This is the Department section.</strong> You can see the detailed
                                    information about the
                                    departments, employees that are working on these departments and the projects that
                                    are associated
                                    with the department.
                                    <button className="btn btn-sm btn-outline-primary mb-2 float-end"
                                            onClick={goToDepartments}>Click here >></button>
                                </div>
                            </div>
                            <br></br>
                        </div>
                        <div className="accordion-item rounded">
                            <h2 className="accordion-header" id="headingThree">
                                <button
                                    className="accordion-button custom-outline rounded"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree"
                                    aria-expanded={accordionState.isOpenThree}
                                    aria-controls="collapseThree"
                                    onClick={() => toggleAccordion('isOpenThree')}
                                >
                                    Projects
                                </button>
                            </h2>
                            <div
                                id="collapseThree"
                                className={`accordion-collapse collapse ${accordionState.isOpenThree ? 'show' : ''}`}
                                aria-labelledby="headingThree"
                                data-bs-parent="#accordion1"
                            >
                                <div className="accordion-body fontcolor">
                                    <strong>This is the Project section.</strong> You can see the detailed information
                                    about the
                                    projects, employees working on these projects, the departments that are associated
                                    with these
                                    projects.
                                    <button className="btn btn-sm btn-outline-primary mb-2 float-end"
                                            onClick={goToProjects}>Click here >></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 ms-5  align-items-center w-40 ">
                    <div id="carouselExampleIndicators" className="carousel slide height align-items-center " data-bs-ride="carousel">
                        <div className="carousel-indicators align-items-center">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                    className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                    aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                    aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner align-items-center" style={{height:"100%"}}>
                            <div className="carousel-item  active ">
                                <img src={image1} className="d-block w-50 " alt="..." style={{objectFit:"cover"}}/>
                            </div>
                            <div className="carousel-item ">
                                <img src={image2} className="d-block w-50 " alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img src={image3} className="d-block w-50 " alt="..."/>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button"
                                data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button"
                                data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePageComponent;
