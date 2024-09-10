import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

export const listEmployees=() =>{
    return axios.get(REST_API_BASE_URL);
}
export const listContacts =  (employeeId) => {
    return axios.get(`${REST_API_BASE_URL}/contacts`,
        {
            params:{
                employeeId: employeeId
            }
        });

}

export const createEmployee= (employee) => axios.post(REST_API_BASE_URL,employee);
export const getEmployee =(employeeId)=> axios.get(REST_API_BASE_URL + "/" +employeeId);
export const updateEmployee=(employeeId,employee)=> axios.put(REST_API_BASE_URL+"/"+employeeId,employee)
export const deleteEmployee=(employeeId)=>axios.delete(REST_API_BASE_URL+"/" +employeeId);
export const getEmployeebyName=(employeeFirstName)=>axios.get(REST_API_BASE_URL+"/name"+"/"+employeeFirstName,employeeFirstName);
export const getEmployeebyFullName=(employeeFirstName,employeeLastName)=>axios.get(REST_API_BASE_URL+"/name"+employeeFirstName+"/"+employeeLastName)


export const addContact=(employeeId,contact)=>axios.post(REST_API_BASE_URL+`/contacts`+"/"+`${employeeId}`,contact);
export const getContact=(contactId)=>axios.get(REST_API_BASE_URL+'/contacts'+contactId);
export const deleteContact=(contactId)=>axios.delete(REST_API_BASE_URL+"/contacts"+"/"+contactId);
export const updateContact=(contactId,contact)=>axios.put(`${REST_API_BASE_URL}/contacts/${contactId}`,contact)
export const getAllContacts=(employeeId)=> {
    return axios.get(`${REST_API_BASE_URL}/contacts`, {
        params: {
            employeeId: employeeId
        }
    })
};

const REST_API_BASE_URL_DEPARTMENTS = 'http://localhost:8080/api/departments';

export const addDepartment=(department)=> axios.post(REST_API_BASE_URL_DEPARTMENTS,department)
export const getAllDepartments=()=>axios.get(REST_API_BASE_URL_DEPARTMENTS)
export const getDepartment=(departmentId)=>axios.get(REST_API_BASE_URL_DEPARTMENTS+"/"+departmentId)
export const deleteDepartment=(departmentId)=>axios.delete(REST_API_BASE_URL_DEPARTMENTS+"/"+departmentId)
export const updateDepartment=(departmentId)=>axios.put(REST_API_BASE_URL_DEPARTMENTS+"/"+departmentId)
export const assignProjectToDepartment=(projectId,departmentId)=>axios.put(REST_API_BASE_URL_DEPARTMENTS+"/assign"+departmentId+projectId)
export const assignEmployeeToDepartment=(departmentId,employeeId)=>axios.put(REST_API_BASE_URL_DEPARTMENTS+"/assign"+departmentId+"/"+employeeId)
export const assignManagerToDepartment=(departmentId,managerId)=>axios.put(REST_API_BASE_URL_DEPARTMENTS+"/"+departmentId+"/"+managerId)
export const changeManager=(departmentId,employee)=>axios.put(REST_API_BASE_URL_DEPARTMENTS+"/change"+"/"+departmentId,employee)
export const getEmployees=(departmentId)=>axios.get(REST_API_BASE_URL_DEPARTMENTS+"/get-employees"+"/"+departmentId)
export const getProjectsInDepartment=(departmentId)=>axios.get(REST_API_BASE_URL_DEPARTMENTS+"/get-projects"+"/"+departmentId)

const REST_API_BASE_URL_PROJECTS = 'http://localhost:8080/api/projects';

export const getAllProjects=()=>axios.get(REST_API_BASE_URL_PROJECTS)
export const getProjectById=(projectId)=>axios.get(REST_API_BASE_URL_PROJECTS+"/"+projectId)
export const createProject=(departmentId,project)=>axios.post(REST_API_BASE_URL_PROJECTS+"/"+departmentId,project)
export const updateProject=(projectId)=>axios.put(REST_API_BASE_URL_PROJECTS+"/"+projectId)
export const deleteProject=(projectId)=>axios.delete(REST_API_BASE_URL_PROJECTS+"/"+projectId)
export const changeDirector=(projectId,employee)=>axios.put(REST_API_BASE_URL_PROJECTS+"/change/"+projectId,employee)
export const getEmployeesInProject=(projectId)=>axios.get(REST_API_BASE_URL_PROJECTS+"/employees/"+projectId)
export const addEmployeeToProject=(projectId,employee)=>axios.put(REST_API_BASE_URL_PROJECTS+"/assign/"+projectId,employee)
export const removeEmployeeFromProject=(projectId,employeeId)=>axios.put(REST_API_BASE_URL_PROJECTS+"/remove/"+projectId+"/"+employeeId)
