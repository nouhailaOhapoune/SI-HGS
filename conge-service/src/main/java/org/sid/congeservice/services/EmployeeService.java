package org.sid.congeservice.services;

import org.sid.congeservice.model.Employee;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@FeignClient(name = "EMPLOYEE-SERVICE")
@Service
public interface EmployeeService {
    @GetMapping(path = "/employees/{id}")
    Employee getEmployeeById(@PathVariable Long id);


}
