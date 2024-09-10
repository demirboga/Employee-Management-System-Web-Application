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
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "projects")
public class Projects {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "project_name")
    private String projectName;

    @Column(name = "project_description")
    private String projectDescription;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonBackReference(value = "department-project")
    @JoinColumn(name = "department_id")
    private Departments department;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
            name = "project_employees",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id")
    )

    private List<Employee> employees;

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "manager_id", referencedColumnName = "id")
    private Employee manager;
}
