package org.sid.documentservice;

import org.sid.documentservice.entities.Document;
import org.sid.documentservice.enums.EtatDocument;
import org.sid.documentservice.enums.TypeDocument;
import org.sid.documentservice.repositories.DocumentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.Date;
import java.util.List;

@SpringBootApplication
public class DocumentServiceApplication {

	private final DocumentRepository documentRepository;

	public DocumentServiceApplication(DocumentRepository documentRepository) {
		this.documentRepository = documentRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(DocumentServiceApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(DocumentRepository documentRepository,
											   RepositoryRestConfiguration repositoryRestConfiguration){
		return args -> {
			repositoryRestConfiguration.exposeIdsFor(Document.class);
			documentRepository.saveAll(
					List.of(
							Document.builder().typeDoc(TypeDocument.WORK_CERTIFICATE)
									.dateDemande("02/04/2017")
									.etatDemandeDocument(EtatDocument.DOCUMENT_DELIVERED).build(),
							Document.builder().typeDoc(TypeDocument.PAY_SLIP).
									dateDemande("02/03/2022")
									.etatDemandeDocument(EtatDocument.DOCUMENT_AWAITING_DE_SIGNATURE)
									.build(),
							Document.builder().typeDoc(TypeDocument.MISSION_SHEET)
									.dateDemande("22/04/2015")
									.etatDemandeDocument(EtatDocument.REQUEST_REFUSED)
									.build(),
							Document.builder().typeDoc(TypeDocument.WORK_CERTIFICATE)
									.dateDemande("22/04/2018")
									.etatDemandeDocument(EtatDocument.DOCUMENT_DELIVERED)
									.build()
					)
			);
			documentRepository.findAll().forEach(d->{
				System.out.println(d);
			});
		};
	}
}
