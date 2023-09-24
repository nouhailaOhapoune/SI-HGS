package org.sid.stagiaireservice.repository;

import org.sid.stagiaireservice.entities.Stagiaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface StagiaireRepository extends JpaRepository <Stagiaire,Long> {
}


