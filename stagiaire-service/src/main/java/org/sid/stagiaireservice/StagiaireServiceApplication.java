package org.sid.stagiaireservice;

import org.sid.stagiaireservice.entities.Stagiaire;
import org.sid.stagiaireservice.repository.StagiaireRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.List;

@SpringBootApplication
public class StagiaireServiceApplication {
    private final StagiaireRepository stagiaireRepository;

    public StagiaireServiceApplication(StagiaireRepository stagiaireRepository) {
        this.stagiaireRepository = stagiaireRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(StagiaireServiceApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(StagiaireRepository stagiaireRepository,
                                               RepositoryRestConfiguration repositoryRestConfiguration){
        return args -> {
            repositoryRestConfiguration.exposeIdsFor(Stagiaire.class);
            stagiaireRepository.saveAll(
                    List.of(
                            Stagiaire.builder().nom("Emmanuel BABILE").
                                    email("emmanuel@gmail.com").
                                    dateNaissance("07/04/2001").
                                    adresse("Sidi Maârrouf, Casablanca").
                                    CNE("Zw34ODB").
                                    nomUniversite("MUNDIAPOLIS").
                                    niveauUniv("2ACI").
                                    durationStage("4 mois").
                                    conventionStage("A.pdf").build(),
                            Stagiaire.builder().nom("Martin Renard").
                                    email("m.renard@yahoo.com").
                                    dateNaissance("07/04/2000").
                                    adresse("Sidi Maârrouf, Casablanca").
                                    CNE("ZR34ODB").
                                    nomUniversite("EMSI").
                                    niveauUniv("1ACP").
                                    durationStage("1 mois").
                                    conventionStage("B.pdf").build(),

                            Stagiaire.builder().nom("Ayoub Hassan").
                                    email("ayoubhassan121@gmail.com").
                                    dateNaissance("07/07/2000").
                                            adresse("Derb Ghallef, Casablanca").
                                    CNE("FR437Z4").
                                    nomUniversite("ISGA").
                                    niveauUniv("2ACI").
                                    durationStage("4 mois").
                                    conventionStage("C.pdf").build(),

                            Stagiaire.builder().nom("Olivier Descartes").
                                    email("olidescartes@icloud.com").
                                    dateNaissance("07/09/2000").
                                    adresse("Belvédère").
                                    CNE("HU492GT").
                                    nomUniversite("HEM").
                                    niveauUniv("1ACI").
                                    conventionStage("D.pdf").
                                    durationStage("2 mois").build(),
                            Stagiaire.builder().nom("Ismail IDRISSI").
                                    email("ismails@icloud.com").
                                    dateNaissance("07/09/2000").
                                    adresse("Casablanca").
                                    CNE("AV92GT").
                                    nomUniversite("MUNDIAPOLIS").
                                    niveauUniv("2ACI").
                                    conventionStage("E.pdf").
                                    durationStage("4 mois").build()
                    )
            );
            stagiaireRepository.findAll().forEach(s->{
                System.out.println(s);
            });
        };
    }
}
