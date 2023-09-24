package org.sid.pretservice.repository;

import org.sid.pretservice.entities.Pret;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface PretRepository extends JpaRepository <Pret, Long> {
}
