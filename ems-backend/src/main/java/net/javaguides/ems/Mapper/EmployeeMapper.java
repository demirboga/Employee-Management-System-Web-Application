package net.javaguides.ems.Mapper;

import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.Employee;

public class EmployeeMapper {
    public static EmployeeDto maptoEmployeeDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(),
                employee.getContacts(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getDepartment(),
                employee.getProjects(),
                employee.getJobTitle()
        );
    }

    public static Employee maptoEmployee(EmployeeDto employeeDto) {
        return new Employee(
                employeeDto.getEmployeeId(),
                employeeDto.getContacts(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getDepartment(),
                employeeDto.getProjects(),
                employeeDto.getJobTitle()
        );
    }
}
