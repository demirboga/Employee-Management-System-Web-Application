

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ListEmployeeComponent from "./components/ListEmployeeComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import findEmployeeComponent from "./components/FindEmployeeComponent.jsx";
import EmployeeComponent from "./components/EmployeeComponent.jsx";
import ContactComponent from "./components/ContactComponent.jsx";
import AddContactComponent from "./components/AddContactComponent.jsx";
import UpdateContactComponent from "./components/UpdateContactComponent.jsx";
import FindEmployeeComponent from "./components/FindEmployeeComponent.jsx";
import HomePageComponent from "./components/HomePageComponent.jsx";
import DepartmentsComponent from "./components/DepartmentsComponent.jsx";
import AddDepartmentComponent from "./components/AddDepartmentComponent.jsx";
import ProjectsComponent from "./components/ProjectsComponent.jsx";
import EmployeesInDepartmentComponent from "./components/EmployeesInDepartmentComponent.jsx";
import AddProjectComponent from "./components/AddProjectComponent.jsx";
import ProjectsInDepartmentComponent from "./components/ProjectsInDepartmentComponent.jsx";
import EmployeesInProject from "./components/EmployeesInProject.jsx";
import JobDetailsComponent from "./components/JobDetailsComponent.jsx";

function App() {


  return (
    <>
        <BrowserRouter>




            <HeaderComponent/>
            <Routes>

                {/*// http://localhost:3000/ */}
                <Route path={"/"} element={<HomePageComponent/>}></Route>
                {/*// http://localhost:3000/home-page */}
                <Route path={"/home-page"} element={<HomePageComponent/>}></Route>
                {/* // http://localhost:3000/employees */}
                <Route path={'/employees'} element={<ListEmployeeComponent/>}></Route>
                {/* // http://localhost:3000/add-employee */}
                <Route path={"/add-employee"} element={<EmployeeComponent/>}></Route>
                {/* // http://localhost:3000/edit-employee/1 */}
                <Route path={"/edit-employee/:id"} element={<EmployeeComponent/>}></Route>
                {/* // http://localhost:3000/find-employee */}
                <Route path={"/find-employee"} element={<FindEmployeeComponent/>}></Route>
                {/* // http://localhost:3000/all-contacts */}
                <Route path={"/all-contacts/:employeeId"} element={<ContactComponent/>}></Route>
                {/* // http://localhost:3000/add-contacts */}
                <Route path={"/add-contact"} element={<AddContactComponent/>}></Route>
                {/* // http://localhost:3000/edit-contacts */}
                <Route path={"/edit-contact"} element={<UpdateContactComponent/>}></Route>
                {/* // http://localhost:3000/departments */}
                <Route path={"/departments"} element={<DepartmentsComponent/>}></Route>
                {/* // http://localhost:3000/add-department */}
                <Route path={"/add-department"} element={<AddDepartmentComponent/>}></Route>
                {/* // http://localhost:3000/projects */}
                <Route path={"/projects"} element={<ProjectsComponent/>}></Route>
                {/* // http://localhost:3000/assigned-employees */}
                <Route path={"/assigned-employees"} element={<EmployeesInDepartmentComponent/>}></Route>
                {/* // http://localhost:3000/add-project */}
                <Route path={"/add-project"} element={<AddProjectComponent/>}></Route>
                {/* // http://localhost:3000/assigned-projects */}
                <Route path={"/assigned-projects"} element={<ProjectsInDepartmentComponent/>}></Route>
                {/* // http://localhost:3000/project-employees */}
                <Route path={"/project-employees"} element={<EmployeesInProject/>}></Route>
                {/* // http://localhost:3000/job-details */}
                <Route path={"/job-details"} element={<JobDetailsComponent/>}></Route>


            </Routes>
        </BrowserRouter>

    </>
  )
}

export default App
