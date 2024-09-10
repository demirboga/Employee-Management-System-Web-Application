package net.javaguides.ems.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.javaguides.ems.dto.EmployeeDto;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Employee_Contacts")
public class EmployeeContacts
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String contactType;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    @JsonBackReference(value = "employee-contact")
    private Employee employee;

    @Column(name = "Contact")
    private String contact;




}
