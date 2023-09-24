package org.sid.congeservice;

import org.sid.congeservice.model.Employee;
import org.sid.congeservice.services.EmployeeService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    public EmployeeService employeeService() {
        // return a placeholder object or a proxy object that implements the EmployeeService interface
        return new EmployeeService() {
            @Override
            public Employee getEmployeeById(Long id) {
                return null;
            }
        };
    }
    //....
}
