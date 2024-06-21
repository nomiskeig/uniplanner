package de.giek.uniplanner.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {
    @GetMapping("/api/getSomething")
    @ResponseBody
    public ResponseEntity<String> getSomething() {
        return new ResponseEntity<String>("test response", HttpStatus.OK);

    }

}
