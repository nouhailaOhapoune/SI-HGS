package org.sid.userservice.Controllers;

import org.sid.userservice.Entities.User;
import org.sid.userservice.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    // GET Request - Récupérer tous les utilisateurs
    @GetMapping("/users")
    public Collection<User> getUsers() {
        return userRepository.findAll();
    }

    // GET Request - Récupérer un utilisateur par son identifiant
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
    }

    // POST Request - Créer un nouvel utilisateur

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        userRepository.save(user);
        return ResponseEntity.ok().body(user);
    }
    // PUT Request - Mettre à jour un utilisateur existant
    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable("id") Long id, @RequestBody User user) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        existingUser.setNomComplet(user.getNomComplet());
        existingUser.setJobTitle(user.getJobTitle());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setTel(user.getTel());
        return userRepository.save(existingUser);
    }

    // DELETE Request - Supprimer un utilisateur par son identifiant
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        userRepository.delete(existingUser);
        return ResponseEntity.noContent().build();
    }
}
