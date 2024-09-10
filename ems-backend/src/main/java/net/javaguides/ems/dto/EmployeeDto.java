package net.javaguides.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.javaguides.ems.entity.Departments;
import net.javaguides.ems.entity.EmployeeContacts;
import net.javaguides.ems.entity.Projects;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {
    private Long employeeId;
    private List<EmployeeContacts> contacts;
    private String firstName;
    private String lastName;
    private Departments department;
    private List<Projects> projects;
    private String jobTitle;

}


