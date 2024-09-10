package net.javaguides.ems.controller;

import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.service.EmployeeService;
import net.javaguides.ems.service.impl.EmployeeServiceImpl;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private final EmployeeRepository employeeRepository;
    private EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService, EmployeeRepository employeeRepository) {
        this.employeeService = employeeService;
        this.employeeRepository = employeeRepository;
    }

    //Build Add Employee REST API
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto savedEmployee= employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    //Build Get Employee Rest API
    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId){
        EmployeeDto employeeDto= employeeService.getEmployeeById(employeeId);
        return ResponseEntity.ok(employeeDto);
    }

    //Build Get All REST API
    @GetMapping
    public List<EmployeeDto> getAllEmployees(){
        List<EmployeeDto> employees= employeeService.getAllEmployees();
        return employees;
    }

    //Build Update Employee REST API
    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId, @RequestBody EmployeeDto updatedEmployee){
        EmployeeDto employeeDto=employeeService.updateEmployee(employeeId,updatedEmployee);
        return ResponseEntity.ok(employeeDto);

    }

    //Build Delete Employee REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok("Employee deleted successfully");
    }

    @GetMapping("/name/{firstName}/{lastName}")
    public ResponseEntity<List<EmployeeDto>> getEmployeeByFullName(@PathVariable("firstName") String firstName, @PathVariable("lastName") String lastName){
        List<EmployeeDto> employeeList= employeeService.getEmployeeByFullName(firstName,lastName);
        return ResponseEntity.ok(employeeList);
    }
    @GetMapping("/name/{firstName}")
    public ResponseEntity<List<EmployeeDto>> getEmployeeByName(@PathVariable("firstName") String firstName){
        List<EmployeeDto> employeeList=employeeService.getEmployeeByFirstname(firstName);
        return ResponseEntity.ok(employeeList);
    }


}
