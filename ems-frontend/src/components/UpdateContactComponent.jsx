import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {addContact, getContact, updateContact} from "../service/EmployeeService.js";

const UpdateContactComponent=()=>{
    const [contactType, setContactType] = useState('');
    const [contact, setContact] = useState('');
    const navigator=useNavigate();
    const [savedContactId, setSavedContactId] = useState(null);
    const [savedEmployeeId, setSavedEmployeeId] = useState(null);
    const location = useLocation();
    const { contactId, employeeId } = location.state || {};
    useEffect(() => {
        if (contactId) {
            setSavedContactId(contactId); // Store contactId in state
        }
    }, [contactId]);
    useEffect(() => {
        if (employeeId) {
            setSavedEmployeeId(employeeId); // Store contactId in state
        }
    }, [employeeId]);

    useEffect(() => {
        if (contactId) {
            getContact(savedContactId)
                .then((response) => {
                    setContactType(response.data.contactType);
                    setContact(response.data.contact);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [savedContactId]);
    useEffect(() => {
        console.log("location.state:", location.state);
        console.log("contactId from location.state:", savedContactId);
    }, [location.state, savedContactId]);



    const [errors,setErrors]=useState({
        contactType:"",
        contact:""
    })
    function validateFormContact(){
        let valid = true;
        const errorsCopy={...errors}
        if(contactType.trim()){
            errorsCopy.contactType="";
        }
        else{
            errorsCopy.contactType="Contact Type is required";
            valid=false;
        }
        if(contact.trim()){
            errorsCopy.contact="";
        }
        else{
            errorsCopy.contact="Contact Details is required";
            valid=false;
        }

        setErrors(errorsCopy);
        return valid;
    }
    function updateAContact(c){

        c.preventDefault();
        if(validateFormContact()){
            const contact1= {contactType,contact}
            console.log(contactId)
            updateContact(savedContactId,contact1).then((response)=>{
                console.log(response.data)
                navigator(`/all-contacts/${savedEmployeeId}`)
            })
        }
    }

    function handleContactType(e){
        setContactType(e.target.getAttribute("data-value"))
    }
    function handleContact(e){
        setContact(e.target.value)
    }

    function goBack(){
        navigator(`/all-contacts/${savedEmployeeId}`);
    }

    return (
        <div className={"container"}>
            <br/><br/><br/>
            <button className={"btn btn-primary mb-2"} onClick={goBack}>Back</button>
            <div className={"row"}>
                <div className={"card col-md-6 offset-md-3 offset-md-3"}>
                    <h2 className={"text-center"}>Update Contact</h2>
                    <div className={"card-body"}>
                        <form>
                            <div className={"form-group mb-2"}>
                                <label className={"form-label"}>Contact Type:</label>
                                <div className="dropdown">
                                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button"
                                       id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        {contactType || "Select Contact Type"}
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <li><a className="dropdown-item" href="#" data-value="GSM"
                                               onClick={handleContactType}>GSM</a></li>
                                        <li><a className="dropdown-item" href="#" data-value="ADDRESS"
                                               onClick={handleContactType}>ADDRESS</a></li>
                                        <li><a className="dropdown-item" href="#" data-value="FAX"
                                               onClick={handleContactType}>FAX</a></li>
                                        <li><a className="dropdown-item" href="#" data-value="EMAIL"
                                               onClick={handleContactType}>EMAIL</a></li>
                                    </ul>
                                </div>
                                {errors.contactType && <div className={"invalid-feedback"}>{errors.contactType}</div>}
                            </div>


                            <div className={"form-group mb-2"}>
                                <label className={"form-label"}>Contact Details:</label>
                                <input
                                    type='text'
                                    placeholder="Enter Contact Details"
                                    name="contact"
                                    value={contact}
                                    className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                                    onChange={handleContact}>

                                </input>
                                {errors.contact && <div className={"invalid-feedback"}>{errors.contact}</div>}
                            </div>


                            <button className={"btn btn-secondary"} onClick={updateAContact}>Submit</button>

                        </form>
                    </div>

                </div>

            </div>

        </div>
    )
}


export default UpdateContactComponent