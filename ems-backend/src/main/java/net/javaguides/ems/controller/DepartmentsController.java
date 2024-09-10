package net.javaguides.ems.controller;

import net.javaguides.ems.dto.DepartmentsDto;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.dto.ProjectsDto;
import net.javaguides.ems.entity.Departments;
import net.javaguides.ems.service.DepartmentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/departments")
public class DepartmentsController {
    private DepartmentsService departmentsService;


    @Autowired
    public DepartmentsController(DepartmentsService departmentsService) {
        this.departmentsService = departmentsService;
    }

    @GetMapping
    public ResponseEntity<List<DepartmentsDto>> getAllDepartments() {
        List<DepartmentsDto> departments = departmentsService.getAllDepartments();
        return ResponseEntity.ok(departments);
    }

    @GetMapping("{id}")
    public ResponseEntity<DepartmentsDto> getDepartmentById(@PathVariable int id) {
        DepartmentsDto departments = departmentsService.getDepartmentById(id);
        return ResponseEntity.ok(departments);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable int id) {
        departmentsService.deleteDepartment(id);
        return ResponseEntity.ok("Department deleted");
    }

    @PostMapping
    public ResponseEntity<DepartmentsDto> addDepartment(@RequestBody DepartmentsDto departments) {
        DepartmentsDto savedDepartments = departmentsService.addDepartment(departments);
        return ResponseEntity.ok(savedDepartments);
    }

    @PutMapping("{id}")
    public ResponseEntity<DepartmentsDto> updateDepartment(@PathVariable int id, @RequestBody DepartmentsDto departments) {
        DepartmentsDto updatedDepartments = departmentsService.updateDepartment(id, departments);
        return ResponseEntity.ok(updatedDepartments);
    }

    @PutMapping("/change/{departmentId}")
    public ResponseEntity<DepartmentsDto> changeManager(@PathVariable int departmentId, @RequestBody EmployeeDto manager) {
        DepartmentsDto updatedDepartments = departmentsService.changeManager(departmentId, manager);
        return ResponseEntity.ok(updatedDepartments);
    }
    @GetMapping("/get-employees/{departmentId}")
    public ResponseEntity<List<EmployeeDto>> getEmployees(@PathVariable int departmentId) {
        List<EmployeeDto> employees = departmentsService.getEmployees(departmentId);
        return ResponseEntity.ok(employees);
    }
    @GetMapping("/get-projects/{departmentId}")
    public ResponseEntity<List<ProjectsDto>> getProjects(@PathVariable int departmentId) {
        List<ProjectsDto> projects= departmentsService.getProjectsInDepartment(departmentId);
        return ResponseEntity.ok(projects);
    }


}
