package net.javaguides.ems.controller;

import net.javaguides.ems.dto.EmployeeContactDto;
import net.javaguides.ems.service.EmployeeContactsService;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("api/employees/contacts")
public class EmployeeContactCon {

    private EmployeeContactsService employeeContactsService;
    @Autowired
    public EmployeeContactCon(EmployeeContactsService employeeContactsService) {
        this.employeeContactsService = employeeContactsService;
    }

    @ResponseBody
    @PostMapping("{employeeId}")
    public ResponseEntity<EmployeeContactDto> addContact(@PathVariable Long employeeId, @RequestBody EmployeeContactDto contactDto) {
        EmployeeContactDto savedContact = employeeContactsService.addContact(employeeId, contactDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedContact);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeContactDto>> getAllContacts(@RequestParam Long employeeId) {
        List<EmployeeContactDto> contacts = employeeContactsService.getAllContacts(employeeId);
        return ResponseEntity.ok(contacts);
    }


    @PutMapping("{contactId}")
    public ResponseEntity<EmployeeContactDto> updateContact(@PathVariable("contactId") int contactId, @RequestBody EmployeeContactDto contactDto) {
        EmployeeContactDto updatedContact = employeeContactsService.updateContact(contactDto, contactId);
        return ResponseEntity.ok(updatedContact);
    }

    @DeleteMapping("{contactId}")
    public ResponseEntity<String> deleteContact(@PathVariable("contactId") int contactId) {
        employeeContactsService.deleteContact(contactId);
        return ResponseEntity.ok("Contact deleted successfully!");
    }
}
