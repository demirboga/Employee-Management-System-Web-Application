package net.javaguides.ems.repository;

import net.javaguides.ems.entity.Projects;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectsRepository extends JpaRepository<Projects, Integer> {
}
