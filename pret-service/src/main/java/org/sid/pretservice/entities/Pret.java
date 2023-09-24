package org.sid.pretservice.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sid.pretservice.enums.EtatPret;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Pret {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private float montant;
    private String dateEmprunt;
    private String dateRembouserment;
    @Enumerated(EnumType.STRING)
    @Column(length = 25)
    private EtatPret etatDemandePret;
}
