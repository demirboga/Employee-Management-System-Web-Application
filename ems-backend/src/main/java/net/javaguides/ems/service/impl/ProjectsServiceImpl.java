package net.javaguides.ems.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import net.javaguides.ems.Mapper.EmployeeMapper;
import net.javaguides.ems.Mapper.ProjectsMapper;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.dto.ProjectsDto;
import net.javaguides.ems.entity.Departments;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.entity.Projects;
import net.javaguides.ems.repository.DepartmentsRepository;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.repository.ProjectsRepository;
import net.javaguides.ems.service.ProjectsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProjectsServiceImpl implements ProjectsService {
    @Autowired
    private ProjectsRepository projectsRepository;
    @Autowired
    private DepartmentsRepository departmentsRepository;
    @Autowired
    private EmployeeRepository employeeRepository;


    @Override
    public List<ProjectsDto> getAllProjects() {
       List<Projects> projects = projectsRepository.findAll();
       return projects.stream().map((project)->
               ProjectsMapper.maptoProjectDto(project)).collect(Collectors.toList());
    }

    @Override
    public ProjectsDto getProjectById(int id) {
        Projects project = projectsRepository.findById(id).orElseThrow(()->new RuntimeException("Project not found"));
        return ProjectsMapper.maptoProjectDto(project);
    }

    @Override
    public ProjectsDto createProject(int departmentId, ProjectsDto project1) {
        Optional<Departments> departmentOpt = departmentsRepository.findById(departmentId);


        if (!departmentOpt.isPresent()) {
            throw new EntityNotFoundException("Department not found with ID: " + departmentId);
        }
        Departments department = departmentOpt.get();

        Projects project = ProjectsMapper.maptoProjects(project1);
        project.setDepartment(department);

        if(project.getManager()!=null){
            Employee manager= project.getManager();
            if(manager.getId()!=null){
                manager=employeeRepository.findById(manager.getId())
                        .orElseThrow(()->new RuntimeException("Employee not found"));

            }
            else {
                List<Employee> existingManagers = employeeRepository.findAllByFirstNameAndLastName(manager.getFirstName(), manager.getLastName());
                if (!existingManagers.isEmpty()) {
                    manager = existingManagers.get(0);
                } else {
                    manager = employeeRepository.save(manager);
                }
            }
            project.setManager(manager);
            manager.setJobTitle("Manager");
            manager.getProjects().add(project);
        }

        if (project.getEmployees() == null) {
            project.setEmployees(new ArrayList<>());
        }

        project.getEmployees().add(project.getManager());
        project.getManager().setDepartment(department);
        Projects savedProject = projectsRepository.save(project);

        return ProjectsMapper.maptoProjectDto(savedProject);

    }

    @Override
    public ProjectsDto updateProject(int projectId, ProjectsDto project1) {
        Projects project=projectsRepository.findById(projectId)
                .orElseThrow(()->new RuntimeException("Project not found"));
        project.setDepartment(project1.getDepartment());
        project.setProjectName(project1.getProjectName());
        project.setProjectDescription(project1.getProjectDescription());
        project.setEmployees(project1.getEmployees());
        project.setManager(project1.getManager());
        Projects updatedProject = projectsRepository.saveAndFlush(project);
        return ProjectsMapper.maptoProjectDto(updatedProject);
    }

    @Override
    public void deleteProject(int id) {
        Projects project = projectsRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Project not found"));
        project.setManager(null);
        Departments department=departmentsRepository.findById(project.getDepartment().getId())
                .orElseThrow(()->new RuntimeException("Department not found"));
        for (Employee employee : project.getEmployees()) {
            employee.setDepartment(null);
            department.getEmployees().remove(employee);
        }
        departmentsRepository.save(department);
        project.setEmployees(null);
        project.setDepartment(null);
        projectsRepository.deleteById(id);

    }

    @Override
    public ProjectsDto changeDirector(int projectId, EmployeeDto director) {
        Projects project=projectsRepository.findById(projectId)
                .orElseThrow(()->new RuntimeException("Project not found"));

        Employee oldManager=project.getManager();
        Employee newManager= EmployeeMapper.maptoEmployee(director);

        if (oldManager != null && project.getDepartment().getEmployees().contains(oldManager)) {
            project.getDepartment().getEmployees().remove(oldManager);
            oldManager.setJobTitle("");
            oldManager.setDepartment(null);
        }
        if (oldManager != null && project.getEmployees().contains(oldManager)) {
            project.getEmployees().remove(oldManager);
            oldManager.getProjects().remove(project);
        }


        project.setManager(newManager);
        newManager.setJobTitle("Manager");
        project.getEmployees().add(newManager);
        if (!project.getDepartment().getEmployees().contains(newManager)) {
            project.getDepartment().getEmployees().add(newManager);
            newManager.setDepartment(project.getDepartment());
        }
        newManager.getProjects().add(project);

        Projects updatedProject = projectsRepository.save(project);
        return ProjectsMapper.maptoProjectDto(updatedProject);

    }

    @Override
    public List<EmployeeDto> getEmployeesInProject(int projectId) {
        Projects project=projectsRepository.findById(projectId)
                .orElseThrow(()->new RuntimeException("Project not found"));
        List<Employee> employees=project.getEmployees();
        return employees.stream().map(EmployeeMapper::maptoEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProjectsDto addEmployeeToProject(int projectId, EmployeeDto employee) {
        Projects project=projectsRepository.findById(projectId)
                .orElseThrow(()->new RuntimeException("Project not found"));
        Employee employee1=EmployeeMapper.maptoEmployee(employee);

        project.getEmployees().add(employee1);
        employee1.getProjects().add(project);

        project.getDepartment().getEmployees().add(employee1);
        employee1.setDepartment(project.getDepartment());


        Projects updatedProject = projectsRepository.save(project);
        return ProjectsMapper.maptoProjectDto(updatedProject);
    }

    @Override
    public ProjectsDto removeEmployeeFromProject(int projectId, int employeeId) {
        Projects project=projectsRepository.findById(projectId)
                .orElseThrow(()->new RuntimeException("Project not found"));
        Employee employee1=employeeRepository.findById(Long.valueOf(employeeId)).get();

        project.getEmployees().remove(employee1);
        employee1.setJobTitle("");
        employee1.getProjects().remove(project);

        project.getDepartment().getEmployees().remove(employee1);
        employee1.setDepartment(null);

        Projects updatedProject = projectsRepository.save(project);
        return ProjectsMapper.maptoProjectDto(updatedProject);
    }


}
