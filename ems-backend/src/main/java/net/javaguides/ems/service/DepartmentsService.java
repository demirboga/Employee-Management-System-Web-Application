package net.javaguides.ems.service;

import net.javaguides.ems.dto.DepartmentsDto;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.dto.ProjectsDto;
import net.javaguides.ems.entity.Employee;

import java.util.List;

public interface DepartmentsService {
    List<DepartmentsDto> getAllDepartments();
    DepartmentsDto getDepartmentById(int id);
    DepartmentsDto addDepartment(DepartmentsDto department);
    DepartmentsDto updateDepartment(int departmentId,DepartmentsDto department);
    void deleteDepartment(int id);
    DepartmentsDto changeManager(int departmentId,EmployeeDto manager);
    List<EmployeeDto> getEmployees(int departmentId);
    List<ProjectsDto> getProjectsInDepartment(int departmentId);

}
