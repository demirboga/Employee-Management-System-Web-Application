package net.javaguides.ems.service;

import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.dto.ProjectsDto;

import java.util.List;

public interface ProjectsService {
    List<ProjectsDto> getAllProjects();
    ProjectsDto getProjectById(int id);
    ProjectsDto createProject(int departmentId,ProjectsDto project);
    ProjectsDto updateProject(int projectId,ProjectsDto project);
    void deleteProject(int id);
    ProjectsDto changeDirector(int projectId, EmployeeDto director);
    List<EmployeeDto> getEmployeesInProject(int projectId);
    ProjectsDto addEmployeeToProject(int projectId, EmployeeDto employee);
    ProjectsDto removeEmployeeFromProject(int projectId,int employeeId);
}
