package net.javaguides.ems.Mapper;

import net.javaguides.ems.dto.DepartmentsDto;
import net.javaguides.ems.entity.Departments;

public class DepartmentsMapper {
    public static DepartmentsDto maptoDepartmentsDto(Departments departments){
        DepartmentsDto departmentsDto = new DepartmentsDto();
        departmentsDto.setId(departments.getId());
        departmentsDto.setDepartmentName(departments.getDepartmentName());
        departmentsDto.setEmployees(departments.getEmployees());
        departmentsDto.setManager(departments.getManager());
        departmentsDto.setProjects(departments.getProjects());
        return departmentsDto;
    }
    public static Departments maptoDepartments(DepartmentsDto departmentsDto){
        Departments departments = new Departments();
        departments.setId(departmentsDto.getId());
        departments.setDepartmentName(departmentsDto.getDepartmentName());
        departments.setEmployees(departmentsDto.getEmployees());
        departments.setManager(departmentsDto.getManager());
        departments.setProjects(departmentsDto.getProjects());
        return departments;
    }
}
