package org.sid.congeservice;

import org.sid.congeservice.entities.Conge;
import org.sid.congeservice.enums.EtatConge;
import org.sid.congeservice.enums.TypeConge;
import org.sid.congeservice.model.Employee;
import org.sid.congeservice.repositories.CongeRepository;
import org.sid.congeservice.services.EmployeeService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;


@SpringBootApplication
@EnableFeignClients
@Import(AppConfig.class)
public class CongeServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CongeServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner start(CongeRepository congeRepository, EmployeeService employeeService){
		return args -> {
			for (Long employeeId = 2L; employeeId <= 7L; employeeId++) {
				Employee employee = employeeService.getEmployeeById(employeeId);
				if (employee == null) throw new RuntimeException("Employee not found");
				Conge conge = new Conge();
				conge.setEmployeeId(employeeId);
				conge.setDureeConge("1 mois");
				conge.setEmployeeName(employee.getNomComplet());
				conge.setEtatDemandeConge(EtatConge.LEAVE_GRANTED);
				conge.setLeaveType(TypeConge.SICK_LEAVE);
				Conge saveAll =congeRepository.save(conge);
			}
		};
	}
}
