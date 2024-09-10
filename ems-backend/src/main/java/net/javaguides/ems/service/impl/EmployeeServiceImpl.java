package net.javaguides.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems.Mapper.DepartmentsMapper;
import net.javaguides.ems.Mapper.EmployeeMapper;
import net.javaguides.ems.Mapper.ProjectsMapper;
import net.javaguides.ems.dto.DepartmentsDto;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.dto.ProjectsDto;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.entity.Projects;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee= EmployeeMapper.maptoEmployee(employeeDto);
        Employee savedEmployee=employeeRepository.save(employee);
        return EmployeeMapper.maptoEmployeeDto(savedEmployee);

    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee is not exists with given ID :"+employeeId));
        return EmployeeMapper.maptoEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
       List<Employee> employees=employeeRepository.findAll();
       return employees.stream().map((employee)->EmployeeMapper.maptoEmployeeDto(employee))
               .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee=employeeRepository.findById(employeeId).orElseThrow(()->new RuntimeException("Employee is not exists with given ID :"+employeeId));
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setDepartment(updatedEmployee.getDepartment());
        Employee updatedEmployeeObj=employeeRepository.save(employee);
        return EmployeeMapper.maptoEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
       Employee employee= employeeRepository.findById(employeeId).orElseThrow(()->new RuntimeException("Employee is not exists with given ID :"+employeeId));
        employeeRepository.deleteById(employeeId);

    }

    @Override
    public List<EmployeeDto> getEmployeeByFullName(String employeeName, String employeeLastName) {
        List<Employee> employees=employeeRepository.findAllByFirstNameAndLastName(employeeName,employeeLastName);
        return employees.stream().map((employee)->EmployeeMapper.maptoEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public List<EmployeeDto> getEmployeeByFirstname(String employeeName) {
        List<Employee> employees=employeeRepository.findAllByFirstName(employeeName);
        return employees.stream().map((employee)->EmployeeMapper.maptoEmployeeDto(employee))
                .collect(Collectors.toList());
    }






}
