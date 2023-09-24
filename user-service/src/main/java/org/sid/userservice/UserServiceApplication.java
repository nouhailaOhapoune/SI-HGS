package org.sid.userservice;

import org.sid.userservice.Entities.User;
import org.sid.userservice.Repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.List;

@SpringBootApplication
public class UserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
    @Bean
    CommandLineRunner start(UserRepository userRepository,
                            RepositoryRestConfiguration restConfiguration){
        return args -> {
            restConfiguration.exposeIdsFor(User.class);

            userRepository.saveAll(
                    List.of(
                            User.builder().nomComplet("Emmanuel Babile")
                                    .email("e.babile@mundiapolis.ma").password("emmanuel")
                                    .tel("0633445566").jobTitle("CHRO").build(),
                            User.builder().nomComplet("Nouhaila OHAPOUNE")
                                    .email("n.ohapoune@mundiapolis.ma").password("nouhaila")
                                    .tel("0633445566").jobTitle("Executive HR").build()

                    )
            );
        };
    }

}
