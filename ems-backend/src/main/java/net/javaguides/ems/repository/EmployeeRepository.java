package net.javaguides.ems.repository;

import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.entity.EmployeeContacts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    List<Employee> findAllByFirstName(String contactType);
    List<Employee> findAllByLastName(String contactType);
    List<Employee> findAllByFirstNameAndLastName(String firstName, String lastName);
}
