package org.sid.stagiaireservice.entities;

import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(name = "resumeStagiaire", types = Stagiaire.class)
public interface StagiaireProjection {

    public String getNom();
    public Long getClasse();
    public String getNomUniversite();
    public String getTypeStage();
    public String getNomEncadrantInterne();
    public String getNomEncadrantExterne();

}
