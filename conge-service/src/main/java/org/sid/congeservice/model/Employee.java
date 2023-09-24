package org.sid.congeservice.model;

import lombok.Data;

import java.io.File;

@Data
public class Employee {
    private Long id;
    private String nomComplet;
    private String dateDeNaissance;
    private String adresse;
    private String email;
    private String tel;
    private String positionHeld;
    private String CNE;
    private String dateEmbauche;
    private File contract;
}
