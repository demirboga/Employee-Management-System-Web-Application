package net.javaguides.ems.repository;

import net.javaguides.ems.entity.Departments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentsRepository extends JpaRepository<Departments,Integer> {
}
