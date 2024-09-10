package net.javaguides.ems.service;

import net.javaguides.ems.dto.EmployeeContactDto;
import net.javaguides.ems.dto.EmployeeDto;

import java.util.List;

public interface EmployeeContactsService {
    List<EmployeeContactDto> getAllContacts(Long employeeId);
    EmployeeContactDto getContactById(int id);
    EmployeeContactDto addContact(Long employeeId,EmployeeContactDto contact);
    EmployeeContactDto updateContact(EmployeeContactDto contact,int contactId);
    void deleteContact(int id);

}
