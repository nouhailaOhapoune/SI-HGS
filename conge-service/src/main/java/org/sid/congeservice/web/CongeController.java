package org.sid.congeservice.web;

import org.sid.congeservice.entities.Conge;
import org.sid.congeservice.enums.EtatConge;
import org.sid.congeservice.enums.TypeConge;
import org.sid.congeservice.model.Employee;
import org.sid.congeservice.repositories.CongeRepository;
import org.sid.congeservice.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
public class CongeController {
    private CongeRepository congeRepository;

    private EmployeeService employeeService;// injection de dépendance du service de gestion des employés

    public CongeController(CongeRepository congeRepository, EmployeeService employeeService) {
        this.congeRepository = congeRepository;
        this.employeeService = employeeService;
    }

    @GetMapping("/conges")
    public Collection<Conge> getConges() {
        return congeRepository.findAll();
    }
    @GetMapping("/conges/{id}")
    public Conge getCongeById(@PathVariable Long id) {
        Conge conge = congeRepository.findById(id).orElse(null);
        if (conge != null) {
            Employee employee = employeeService.getEmployeeById(conge.getEmployeeId()); // appel au micro-service de gestion des employés avec @OpenFeign
            conge.setEmployee(employee);
        }
        return conge;
    }


    @PostMapping("/conges")
    public Conge createConge(@RequestBody Conge conge) {
        Employee employee = employeeService.getEmployeeById(conge.getEmployeeId()); // appel au micro-service de gestion des employés avec @OpenFeign
        conge.setEmployeeName(employee.getNomComplet());
        conge.setEmployee(employee);
        Conge newConge = congeRepository.save(conge);
        return newConge;
    }

    @PutMapping("/conges/{id}")
    public Conge updateConge(@PathVariable Long id, @RequestBody Conge conge) {
        Employee employee = employeeService.getEmployeeById(conge.getEmployeeId()); // appel au micro-service de gestion des employés avec @OpenFeign
        conge.setEmployeeName(employee.getNomComplet());
        conge.setEmployee(employee);
        Conge updatedConge = congeRepository.save(conge); // enregistrement de l'objet Conge mis à jour via le repository JPA
        return updatedConge;
    }
    @DeleteMapping("/conges/{id}")
    public String deleteConge(@PathVariable("id") Long id) {
        Conge conge = congeRepository.findById(id).orElse(null);
        if(conge != null) {
            Employee employee = employeeService.getEmployeeById(conge.getEmployeeId()); // appel au micro-service de gestion des employés avec @OpenFeign
            congeRepository.delete(conge);
            return "Conge with id " + id + " for employee " + employee.getNomComplet() + " deleted successfully";
        } else {
            return "Conge not found";
        }
    }

    @GetMapping("/etat-conge")
    public EtatConge[] getEtatConge() {
        return EtatConge.values();
    }

    @GetMapping("/type-conge")
    public TypeConge[] getTypeConge() {
        return TypeConge.values();
    }
}
