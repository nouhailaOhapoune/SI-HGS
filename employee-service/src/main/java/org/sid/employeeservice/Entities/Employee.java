package org.sid.employeeservice.Entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.io.File;


@Entity @Data  @AllArgsConstructor @NoArgsConstructor @Builder
public class Employee {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;
   private String nomComplet;
   private String dateDeNaissance;
   private String adresse;
   private String email;
   private String tel;
   private String positionHeld;
   private String CNE;
   private String dateEmbauche;
   private String contract;
}
