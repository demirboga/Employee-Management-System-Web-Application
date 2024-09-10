package net.javaguides.ems.Mapper;

import net.javaguides.ems.dto.EmployeeContactDto;
import net.javaguides.ems.entity.EmployeeContacts;

public class EmployeeContactsMapper {
    public static EmployeeContacts mapEmployeeContactDtoToEmployeeContact(EmployeeContactDto dto) {
        EmployeeContacts employeeContact = new EmployeeContacts();
        if (dto.getId() != null) {
            employeeContact.setId(dto.getId().intValue()); // Set the ID if present (for updating)
        }
        employeeContact.setContact(dto.getContact());
        employeeContact.setContactType(dto.getContactType());
        return employeeContact;
    }

    public static EmployeeContactDto mapEmployeeContactToDto(EmployeeContacts entity) {
        EmployeeContactDto dto = new EmployeeContactDto();
        dto.setId(Long.valueOf(entity.getId()));
        dto.setContact(entity.getContact());
        dto.setContactType(entity.getContactType());
        return dto;
    }
}