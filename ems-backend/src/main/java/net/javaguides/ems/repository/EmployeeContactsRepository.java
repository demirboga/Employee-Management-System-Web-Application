package net.javaguides.ems.repository;

import net.javaguides.ems.entity.EmployeeContacts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeContactsRepository extends JpaRepository<EmployeeContacts, Integer> {
    List<EmployeeContacts> findByEmployee_Id(Long employeeId);
}
