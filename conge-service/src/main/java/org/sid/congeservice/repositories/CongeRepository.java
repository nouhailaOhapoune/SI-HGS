package org.sid.congeservice.repositories;

import org.sid.congeservice.entities.Conge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import java.util.List;

@RepositoryRestResource
public interface CongeRepository extends JpaRepository<Conge,Long> {
    @RestResource(path = "/byEmployeeId")
    List<Conge> getByEmployeeId(@Param("employeeId") Long employeeId);
}
