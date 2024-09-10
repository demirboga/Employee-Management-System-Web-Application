package net.javaguides.ems.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import net.javaguides.ems.Mapper.EmployeeContactsMapper;
import net.javaguides.ems.dto.EmployeeContactDto;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.entity.EmployeeContacts;
import net.javaguides.ems.repository.EmployeeContactsRepository;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.service.EmployeeContactsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeContactServiceImpl implements EmployeeContactsService {

    @Autowired
    private EmployeeContactsRepository employeeContactsRepository;

    @Autowired
    private EmployeeRepository employeeRepository;



    @Override
    public List<EmployeeContactDto> getAllContacts(Long employeeId) {
        List<EmployeeContacts> contacts = employeeContactsRepository.findByEmployee_Id(employeeId);
        return contacts.stream()
                .map(EmployeeContactsMapper::mapEmployeeContactToDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeContactDto getContactById(int id) {
        EmployeeContacts employeeContact = employeeContactsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact is not exists with given ID :" + id));
        return EmployeeContactsMapper.mapEmployeeContactToDto(employeeContact);
    }

    @Override
    public EmployeeContactDto addContact(Long employeeId, EmployeeContactDto contact) {
        Optional<Employee> employeeOpt = employeeRepository.findById(employeeId);

        if (!employeeOpt.isPresent()) {
            throw new EntityNotFoundException("Employee not found with ID: " + employeeId);
        }

        Employee employee = employeeOpt.get();

        EmployeeContacts employeeContact = EmployeeContactsMapper.mapEmployeeContactDtoToEmployeeContact(contact);
        employeeContact.setEmployee(employee);

        employeeContact = employeeContactsRepository.save(employeeContact);

        return EmployeeContactsMapper.mapEmployeeContactToDto(employeeContact);
    }

    @Override
    public EmployeeContactDto updateContact(EmployeeContactDto contact, int contactId) {
        EmployeeContacts employeeContact = employeeContactsRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contact is not exists with given ID :" + contactId));
        employeeContact.setContactType(contact.getContactType());
        employeeContact.setContact(contact.getContact());
        EmployeeContacts updatedContactObj = employeeContactsRepository.save(employeeContact);
        return EmployeeContactsMapper.mapEmployeeContactToDto(updatedContactObj);
    }

    @Override
    public void deleteContact(int id) {
        EmployeeContacts employeeContact = employeeContactsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact is not exists with given ID :" + id));
        employeeContactsRepository.deleteById(id);
    }
}
