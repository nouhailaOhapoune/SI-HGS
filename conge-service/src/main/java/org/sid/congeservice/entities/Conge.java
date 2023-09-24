package org.sid.congeservice.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sid.congeservice.enums.EtatConge;
import org.sid.congeservice.enums.TypeConge;
import org.sid.congeservice.model.Employee;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder

public class Conge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "leaveType")
    @Enumerated(EnumType.STRING)
    private TypeConge leaveType;
    private String dureeConge;
    @Column(name = "etatDemandeConge")
    @Enumerated(EnumType.STRING)
    private EtatConge etatDemandeConge;
    private Long employeeId;
    private String employeeName;
    @Transient
    private Employee employee;
}
