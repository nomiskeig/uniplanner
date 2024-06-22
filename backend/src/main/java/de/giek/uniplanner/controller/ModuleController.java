package de.giek.uniplanner.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/modules")
public class ModuleController {
    
    @PostMapping("/addMapping")
    public ResponseEntity<SuccessAndMessageDTO>

}
