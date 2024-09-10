package net.javaguides.ems.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "employee-contact")
    private List<EmployeeContacts> contacts;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @ManyToOne
    @JsonBackReference(value = "department-employee")
    @JoinColumn(name = "department_id")
    private Departments department;

    @ManyToMany(mappedBy = "employees")
    @JsonBackReference(value = "project-employee")
    private List<Projects> projects;

    @Column
    private String jobTitle="";
}
