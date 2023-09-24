package org.sid.pretservice;

import org.sid.pretservice.entities.Pret;
import org.sid.pretservice.enums.EtatPret;
import org.sid.pretservice.repository.PretRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.Date;
import java.util.List;

@SpringBootApplication
public class PretServiceApplication {

    private final PretRepository pretRepository;

    public PretServiceApplication(PretRepository pretRepository) {
        this.pretRepository = pretRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(PretServiceApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(PretRepository pretRepository,
                                               RepositoryRestConfiguration repositoryRestConfiguration){
        return args -> {
            repositoryRestConfiguration.exposeIdsFor(Pret.class);
            pretRepository.saveAll(
                    List.of(
                            Pret.builder().montant(4500)
                                    .dateEmprunt("01/12/2021")
                                    .dateRembouserment("01/01/2023")
                                    .etatDemandePret(EtatPret.LOAN_GRANTED)
                                    .build(),
                            Pret.builder().montant(300)
                                    .dateEmprunt("01/12/2020")
                                    .dateRembouserment("01/01/2021")
                                    .etatDemandePret(EtatPret.LOAN_REIMBURSED)
                                    .build(),
                            Pret.builder().montant(78500)
                                    .dateEmprunt("01/12/2018")
                                    .dateRembouserment("01/01/2010")
                                    .etatDemandePret(EtatPret.LOAN_REFUSED)
                                    .build(),
                            Pret.builder().montant(10500)
                                    .dateEmprunt("01/12/2010")
                                    .dateRembouserment("01/01/2015")
                                    .etatDemandePret(EtatPret.LOAN_REIMBURSED)
                                    .build()
                    )
            );
            pretRepository.findAll().forEach(p->{
                System.out.println(p);
            });
        };

    }

}
