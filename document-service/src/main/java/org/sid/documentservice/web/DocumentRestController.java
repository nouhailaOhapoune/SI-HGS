package org.sid.documentservice.web;

import org.sid.documentservice.entities.Document;
import org.sid.documentservice.enums.EtatDocument;
import org.sid.documentservice.enums.TypeDocument;
import org.sid.documentservice.repositories.DocumentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class DocumentRestController {
    private DocumentRepository documentRepository;

    public DocumentRestController(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }
    @GetMapping("/documents")
    public List<Document> documents(){
        return documentRepository.findAll();
    }
    @GetMapping("/documents/{id}")
    public Document getDocument(@PathVariable Long id){
        return documentRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Document non trouvé"));
    }
    @PostMapping("/documents")
    public Document save(@RequestBody Document document){
        document.setId(UUID.randomUUID().getMostSignificantBits());
        return documentRepository.save(document);
    }
    @PutMapping("/documents/{id}")
    public Document update(@RequestBody Document document, @PathVariable Long id){
        document.setId(id);
        return documentRepository.save(document);
    }
    @DeleteMapping("/documents/{id}")
    public void delete(@PathVariable Long id){
        documentRepository.deleteById(id);
    }

    @GetMapping("/etat-document")
    public EtatDocument[] getEtatDocument() {
        return EtatDocument.values();
    }

    @GetMapping("/type-document")
    public TypeDocument[] getTypeDocument() {
        return TypeDocument.values();
    }
}
