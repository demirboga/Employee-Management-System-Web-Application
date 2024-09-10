package net.javaguides.ems.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import net.javaguides.ems.Mapper.DepartmentsMapper;
import net.javaguides.ems.Mapper.EmployeeMapper;
import net.javaguides.ems.Mapper.ProjectsMapper;
import net.javaguides.ems.dto.DepartmentsDto;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.dto.ProjectsDto;
import net.javaguides.ems.entity.Departments;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.entity.Projects;
import net.javaguides.ems.repository.DepartmentsRepository;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.repository.ProjectsRepository;
import net.javaguides.ems.service.DepartmentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DepartmentsServiceImpl implements DepartmentsService {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private DepartmentsRepository departmentsRepository;
    private ProjectsRepository projectsRepository;

    @Override
    public List<DepartmentsDto> getAllDepartments() {
        List<Departments> departments = departmentsRepository.findAll();
        return departments.stream().map((department)->
                DepartmentsMapper.maptoDepartmentsDto(department)).collect(Collectors.toList());
    }

    @Override
    public DepartmentsDto getDepartmentById(int id) {
        Departments department= departmentsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department is not exists with given ID :"+id));
        return DepartmentsMapper.maptoDepartmentsDto(department);
    }


    @Override
    public DepartmentsDto addDepartment(DepartmentsDto departmentDto) {
        Departments department = DepartmentsMapper.maptoDepartments(departmentDto);

        if (department.getManager() != null) {
            Employee manager1= department.getManager();
            if (manager1.getId() != null) {
                manager1 = employeeRepository.findById(manager1.getId())
                        .orElseThrow(() -> new RuntimeException("Manager not found with ID: " ));
            } else {
                List<Employee> existingManagers = employeeRepository.findAllByFirstNameAndLastName(manager1.getFirstName(), manager1.getLastName());
                if (!existingManagers.isEmpty()) {
                    manager1 = existingManagers.get(0);
                } else {
                    manager1 = employeeRepository.save(manager1);
                }
            }
            department.setManager(manager1);
            manager1.setDepartment(department);
            manager1.setJobTitle("Manager");
        }
        Departments savedDepartment = departmentsRepository.save(department);
        return DepartmentsMapper.maptoDepartmentsDto(savedDepartment);
    }

    @Override
    public DepartmentsDto updateDepartment(int departmentId, DepartmentsDto department1) {
        Departments department=departmentsRepository.findById(departmentId)
                .orElseThrow(()->new RuntimeException("Department is not exists with given ID :"+departmentId));
        department.setDepartmentName(department1.getDepartmentName());
        department.setEmployees(department1.getEmployees());
        department.setProjects(department1.getProjects());
        department.setManager(department1.getManager());
        Departments updatedDepartment=departmentsRepository.save(department);
        return DepartmentsMapper.maptoDepartmentsDto(updatedDepartment);
    }

    @Override
    public void deleteDepartment(int id) {
        Departments department=departmentsRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Department is not exists with given ID :"+id));
        department.getManager().setDepartment(null);
        department.setManager(null);
        department.setEmployees(null);
        departmentsRepository.deleteById(id);

    }

    @Override
    public DepartmentsDto changeManager(int departmentId, EmployeeDto managerDto) {
        Departments department1 = departmentsRepository.findById(departmentId)
                .orElseThrow(()->new RuntimeException("Department is not exists with given ID :"+departmentId));

        Employee oldManager=department1.getManager();
        Employee newManager = EmployeeMapper.maptoEmployee(managerDto);

        department1.setManager(null);
        oldManager.setDepartment(null);

        department1.getEmployees().remove(oldManager);
        oldManager.setJobTitle("");
        department1.getEmployees().add(newManager);

        department1.setEmployees(department1.getEmployees());
        department1.setManager(newManager);
        newManager.setJobTitle("Manager");
        newManager.setDepartment(department1);

        Departments savedDepartment = departmentsRepository.saveAndFlush(department1);

        return DepartmentsMapper.maptoDepartmentsDto(savedDepartment);
    }

    @Override
    public List<EmployeeDto> getEmployees(int departmentId) {
        Departments departments=departmentsRepository.findById(departmentId)
                .orElseThrow(()->new RuntimeException("Department is not exists with given ID :"+departmentId));
        List<Employee> employees=departments.getEmployees();
        return employees.stream()
                .map(EmployeeMapper::maptoEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectsDto> getProjectsInDepartment(int departmentId) {
        Departments departments=departmentsRepository.findById(departmentId)
                .orElseThrow(()->new RuntimeException("Department is not exists with given ID :"+departmentId));
        List<Projects> projects=departments.getProjects();
        return projects.stream().map(ProjectsMapper::maptoProjectDto)
                .collect(Collectors.toList());
    }


}
