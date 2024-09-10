import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";
import {addContact, deleteContact, deleteEmployee, listContacts, updateContact} from "../service/EmployeeService.js";

const ContactComponent = () => {
    const { employeeId } = useParams();
    const { contactId } = useParams();
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=>{
        getAllContacts(employeeId);
    },[employeeId])



    const navigator=useNavigate()

    function goBack(){
        navigator("/employees");
    }


    const getAllContacts = (employeeId) => {
        listContacts(employeeId).then((response) => {
            setContacts(response.data);
        }).catch(error => {
            console.error(error);
        });
    }
    const addCont = () => {
        navigator('/add-contact', { state: { employeeId } });
    };
    const navigate=useNavigate();
    const uppCont=(contactId)=>{
        console.log("Navigating with contactId:", contactId); // Debug log to ensure contactId is passed correctly
        navigate('/edit-contact', { state: { contactId , employeeId } });
    }
    const deleteAContact=(id)=>{
        console.log(id);
        deleteContact(id).then((response)=>{
            getAllContacts(employeeId);
        }).catch(error=>console.error(error));
    }


    return (
        <div className={"container"}>
            <h2 className={"text-center"}>Contacts</h2>
            <button className={"btn btn-primary mb-2"} onClick={goBack}>Back</button>
            <br></br>
            <button className={"btn btn-secondary mb-2" } onClick={addCont}>Add Contact</button>
            <table className={"table-striped table table-bordered"}>
                <thead>
                <tr>
                    <th>Contact Type</th>
                    <th>Contact Details</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    contacts.map(contact=>
                        <tr key={contact.contactId}>
                            <td>{contact.contactType}</td>
                            <td>{contact.contact}</td>
                            <td>
                                <button className={"btn btn-secondary"}
                                        onClick={() => uppCont(contact.id)}>Update
                                </button>
                                <span style={{marginRight: "10px"}}></span>
                                <button className={"btn btn-primary"}
                                        onClick={() => deleteAContact(contact.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    )
                }
                </tbody>

            </table>

        </div>

    );
};

export default ContactComponent;
