package net.javaguides.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.javaguides.ems.entity.Departments;
import net.javaguides.ems.entity.Employee;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectsDto {
    private int id;
    private String projectName;
    private String projectDescription;
    private Departments department;
    private List<Employee> employees;
    private Employee manager;

}
