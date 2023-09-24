package org.sid.stagiaireservice.web;

import org.sid.stagiaireservice.entities.Stagiaire;
import org.sid.stagiaireservice.repository.StagiaireRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class StagiaireRestController {
    private StagiaireRepository stagiaireRepository;

    public StagiaireRestController(StagiaireRepository stagiaireRepository) {
        this.stagiaireRepository = stagiaireRepository;
    }
    @GetMapping("/stagiaires")
    public List<Stagiaire> stagiaires(){
        return stagiaireRepository.findAll();
    }
    @GetMapping("/stagiaires/{id}")
    public Stagiaire getStagiaire(@PathVariable Long id){
        return stagiaireRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Stagiaire pas trouvé"));
    }

    @PostMapping("/stagiaires")
    public Stagiaire save(@RequestBody Stagiaire stagiaire){
        stagiaire.setId(UUID.randomUUID().getMostSignificantBits());
        return stagiaireRepository.save(stagiaire);
    }

    @PutMapping("/stagiaires/{id}")
    public Stagiaire update(@RequestBody Stagiaire stagiaire, @PathVariable Long id){
        stagiaire.setId(id);
        return stagiaireRepository.save(stagiaire);
    }
    @DeleteMapping("/stagiaires/{id}")
    public void delete(@PathVariable Long id){
        stagiaireRepository.deleteById(id);
    }
}