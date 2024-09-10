package net.javaguides.ems.entity;

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
@Table(name = "departments")
public class Departments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "department_name")
    private String departmentName;

    @OneToMany(mappedBy = "department", cascade = {CascadeType.MERGE,CascadeType.REMOVE},orphanRemoval = true)
    @JsonManagedReference(value = "department-employee")
    private List<Employee> employees;

    @OneToOne
    @JoinColumn(name = "manager_id")
    private Employee manager;

    @OneToMany(mappedBy = "department", cascade = {CascadeType.MERGE,CascadeType.REMOVE})
    private List<Projects> projects;
}
