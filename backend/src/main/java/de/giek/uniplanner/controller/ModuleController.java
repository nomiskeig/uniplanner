package de.giek.uniplanner.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.giek.uniplanner.dto.SuccessAndMessageDTO;

@RestController
@RequestMapping("/api/v1/modules")
public class ModuleController {
    
    @PostMapping("/addMapping")
    public ResponseEntity<SuccessAndMessageDTO>  addMapping() {
        return null;
    }

}
