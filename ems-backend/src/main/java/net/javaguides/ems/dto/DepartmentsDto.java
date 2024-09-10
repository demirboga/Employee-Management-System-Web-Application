package net.javaguides.ems.dto;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.entity.Projects;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DepartmentsDto {
    private int id;
    private String departmentName;
    private List<Employee> employees;
    private Employee manager;
    private List<Projects> projects;
}
