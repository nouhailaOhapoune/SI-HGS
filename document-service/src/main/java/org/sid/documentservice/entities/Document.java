package org.sid.documentservice.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sid.documentservice.enums.EtatDocument;
import org.sid.documentservice.enums.TypeDocument;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder

public class Document {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "typeDoc")
    @Enumerated(EnumType.STRING)
    private TypeDocument typeDoc;
    private String dateDemande;
    @Enumerated(EnumType.STRING)
    @Column(length = 35)
    private EtatDocument etatDemandeDocument;

}
