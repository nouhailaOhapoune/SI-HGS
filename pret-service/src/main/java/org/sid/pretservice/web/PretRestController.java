package org.sid.pretservice.web;

import org.sid.pretservice.entities.Pret;
import org.sid.pretservice.enums.EtatPret;
import org.sid.pretservice.repository.PretRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class PretRestController {
    private PretRepository pretRepository;

    public PretRestController(PretRepository pretRepository) {
        this.pretRepository = pretRepository;
    }

    @GetMapping("/prets")
    public List<Pret> prets(){
        return pretRepository.findAll();
    }
    @GetMapping("/prets/{id}")
    public Pret getPret(@PathVariable Long id){
        return pretRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Prêt non trouvé"));
    }

    @PostMapping("/prets")
    public Pret save(@RequestBody Pret pret){
        pret.setId(UUID.randomUUID().getMostSignificantBits());
        return pretRepository.save(pret);
    }

    @PutMapping("/prets/{id}")
    public Pret update(@RequestBody Pret pret, @PathVariable Long id){
        pret.setId(id);
        return pretRepository.save(pret);
    }
    @DeleteMapping("/prets/{id}")
    public void delete(@PathVariable Long id){
        pretRepository.deleteById(id);
    }

    @GetMapping("/etat-pret")
    public EtatPret[] getEtatPret() {
        return EtatPret.values();
    }

}
