package org.sid.employeeservice;


import org.sid.employeeservice.Entities.Employee;
import org.sid.employeeservice.Repositories.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.List;

@SpringBootApplication
public class EmployeeServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployeeServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(EmployeeRepository employeeRepository,
                            RepositoryRestConfiguration restConfiguration){
        return args -> {
            restConfiguration.exposeIdsFor(Employee.class);

            employeeRepository.saveAll(
                    List.of(
                            Employee.builder().nomComplet("Nouhaila OHAPOUNE").adresse("Casablanca").CNE("BA2596")
                                    .email("nouhaila@mundiapolis.ma").positionHeld("dev").dateDeNaissance("07/01/2000")
                                    .tel("0644359316").dateEmbauche("03/06/2024").contract("A.pdf").build(),
                            Employee.builder().nomComplet("Ilham Idrissi").adresse("Casablanca").CNE("BA2596")
                                    .email("ilham@mundiapolis.ma").positionHeld("dev").dateDeNaissance("07/01/2000")
                                    .tel("0644359316").dateEmbauche("03/06/2024").contract("B.pdf").build(),
                            Employee.builder().nomComplet("Oumaima El amiri").adresse("Casablanca").CNE("BA2596")
                                    .email("oumaima@mundiapolis.ma").positionHeld("dev").dateDeNaissance("07/01/2000")
                                    .tel("0644359316").dateEmbauche("03/06/2024").contract("C.pdf").build(),
                            Employee.builder().nomComplet("Salma Brahimi").adresse("Casablanca").CNE("BA2596")
                                    .email("salma@mundiapolis.ma").positionHeld("dev").dateDeNaissance("07/01/2000")
                                    .tel("0644359316").dateEmbauche("03/06/2024").contract("D.pdf").build(),
                            Employee.builder().nomComplet("Nouhaila ZAHRAOUI").adresse("Casablanca").CNE("BA2596")
                                    .email("zahraoui@mundiapolis.ma").positionHeld("dev").dateDeNaissance("07/01/2000")
                                    .tel("0644359316").dateEmbauche("03/06/2024").contract("E.pdf").build(),
                            Employee.builder().nomComplet("Emmanuel Babile").adresse("Casablanca").CNE("BA2596")
                                    .email("emmanuel@mundiapolis.ma").positionHeld("dev").dateDeNaissance("07/01/2000")
                                    .tel("0644359316").dateEmbauche("03/06/2024").contract("F.pdf").build(),
                            Employee.builder().nomComplet("Edy Mermouz").adresse("Casablanca").CNE("BA2596")
                                    .email("eddy@mundiapolis.ma").positionHeld("dev").dateDeNaissance("07/01/2000")
                                    .tel("0644359316").dateEmbauche("03/06/2024").contract("G.pdf").build()

                    )
            );
        };
    }



}
