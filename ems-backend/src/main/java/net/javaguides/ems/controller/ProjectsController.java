package net.javaguides.ems.controller;

import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.dto.ProjectsDto;
import net.javaguides.ems.service.DepartmentsService;
import net.javaguides.ems.service.ProjectsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/projects")
public class ProjectsController {

    @Autowired
    private ProjectsService projectsService;

    @Autowired
    public ProjectsController(ProjectsService projectsService) {
        this.projectsService = projectsService;
    }

    @GetMapping
    public ResponseEntity<List<ProjectsDto>> getAllProjects() {
        List<ProjectsDto> projects = projectsService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProjectsDto> getProjectById(@PathVariable("id") int id) {
        ProjectsDto project = projectsService.getProjectById(id);
        return ResponseEntity.ok(project);
    }

    @PostMapping("{departmentId}")
    public ResponseEntity<ProjectsDto> createProject(@PathVariable int departmentId,@RequestBody ProjectsDto project) {
        ProjectsDto savedProject = projectsService.createProject(departmentId,project);
        return new ResponseEntity<> (savedProject, HttpStatus.CREATED);
    }

    @PutMapping("{projectId}")
    public ResponseEntity<ProjectsDto> updateProject(@PathVariable int projectId, @RequestBody ProjectsDto project) {
        ProjectsDto updatedProject = projectsService.updateProject(projectId,project);
        return ResponseEntity.ok(updatedProject);
    }

    @DeleteMapping("{projectId}")
    public ResponseEntity<String> deleteProject(@PathVariable int projectId) {
        projectsService.deleteProject(projectId);
        return ResponseEntity.ok("Project is deleted");
    }

    @PutMapping("/change/{projectId}")
    public ResponseEntity<ProjectsDto> changeDirector(@PathVariable int projectId, @RequestBody EmployeeDto director) {
        ProjectsDto updatedProject = projectsService.changeDirector(projectId,director);
        return ResponseEntity.ok(updatedProject);
    }

    @GetMapping("/employees/{projectId}")
    public ResponseEntity<List<EmployeeDto>> getEmployeesInProject(@PathVariable int projectId) {
        List<EmployeeDto> employees = projectsService.getEmployeesInProject(projectId);
        return ResponseEntity.ok(employees);
    }
    @PutMapping("/assign/{projectId}")
    public ResponseEntity<ProjectsDto> assignEmployee(@PathVariable int projectId, @RequestBody EmployeeDto employee) {
        ProjectsDto updatedProject=projectsService.addEmployeeToProject(projectId,employee);
        return ResponseEntity.ok(updatedProject);
    }
    @PutMapping("/remove/{projectId}/{employeeId}")
    public ResponseEntity<ProjectsDto> removeEmployee(@PathVariable int projectId, @PathVariable int employeeId) {
        ProjectsDto updatedProject=projectsService.removeEmployeeFromProject(projectId,employeeId);
        return ResponseEntity.ok(updatedProject);
    }


}
