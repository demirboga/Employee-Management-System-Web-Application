import React, {useEffect, useState} from "react";
import {createEmployee, getEmployee, updateEmployee} from "../service/EmployeeService.js";
import {useNavigate, useParams} from "react-router-dom";
import{addContact,getContact,updateContact,deleteContact} from "../service/EmployeeService.js";

const EmployeeComponent= ()=>{
    const [firstName,setFirstName]= useState('')
    const [lastName,setLastName]= useState('')




    const navigator=useNavigate();
    const {id}=useParams();
    useEffect(()=>{
        if(id){
            getEmployee(id).then((response)=>{
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
            }).catch(error=>{
                console.error(error);
            })
        }
    },[id])



    

    const [errors,setErrors]=useState({
        firstName:"",
        lastName:"",
    })

    function validateForm(){
        let valid = true;
        const errorsCopy={...errors}
        if(firstName.trim()){
            errorsCopy.firstName="";
        }
        else{
            errorsCopy.firstName="First Name is required";
            valid=false;
        }
        if(lastName.trim()){
            errorsCopy.lastName="";
        }
        else{
            errorsCopy.lastName="Last Name is required";
            valid=false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function handleFirstName(e){
        setFirstName(e.target.value);

    }
    function handleLastName(e){
        setLastName(e.target.value);

    }

    function saveOrUpdateEmployee(e){

        e.preventDefault();
        if(validateForm()){
            const employee= {firstName,lastName}
            console.log(employee)
            if(id){
                updateEmployee(id,employee).then((response)=>{
                    console.log(response.data);
                    navigator("/employees");

                }).catch(error=>console.error(error));
            }
            else{
                createEmployee(employee).then((response)=>{
                    console.log(response.data)
                    navigator("/employees")
                })
            }
        }



    }
    function pageTitle(){
        if(id) {
            return <h2 className={"text-center"}>Update Employee</h2>
        }
        else {
            return <h2 className={"text-center"}>Add Employee</h2>
        }
    }
    function goBack(){
        navigator(-1);
    }





    return(
        <div className={"container"}>
            <br/><br/><br/>
            <button className={"btn btn-primary mb-2"} onClick={goBack}>Back</button>
            <div className={"row"}>
                <div className={"card col-md-6 offset-md-3 offset-md-3"}>
                    {
                        pageTitle()
                    }
                    <div className={"card-body"}>
                        <form>
                            <div className={"form-group mb-2"}>
                                <label className={"form-label"}>First Name:</label>
                                <input
                                    type='text'
                                    placeholder="Enter Employee First Name"
                                    name="firstname"
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={handleFirstName}>

                                </input>
                                {errors.firstName && <div className={"invalid-feedback"}>{errors.firstName}</div>}
                            </div>

                            <div className={"form-group mb-2"}>
                                <label className={"form-label"}>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder="Enter Employee Last Name"
                                    name="lastname"
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={handleLastName}>

                                </input>
                                {errors.lastName && <div className={"invalid-feedback"}>{errors.lastName}</div>}
                            </div>

                            <button className={"btn btn-secondary "} onClick={saveOrUpdateEmployee}>Submit</button>

                        </form>
                    </div>

                </div>

            </div>

        </div>
    )
}
export default EmployeeComponent