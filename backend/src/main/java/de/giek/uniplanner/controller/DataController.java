package de.giek.uniplanner.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.giek.uniplanner.dto.ListDataDTO;
import de.giek.uniplanner.model.ModuleEntity;
import de.giek.uniplanner.model.StudyCourseEntity;
import de.giek.uniplanner.repository.ModuleRepo;
import de.giek.uniplanner.repository.StudyCourseRepo;

@RestController
@RequestMapping("/api/v1/data")
public class DataController {

    @Autowired
    private StudyCourseRepo studyCourseRepo;
    @Autowired
    private ModuleRepo moduleRepo;

    @GetMapping("/studyCourses")
    public ResponseEntity<ListDataDTO<StudyCourseEntity>> getStudyCourses() {
        ListDataDTO<StudyCourseEntity> res = new ListDataDTO<>();
        List<StudyCourseEntity> data = studyCourseRepo.findAll();
        System.out.println(data);
        res.setData(data);
        res.setSuccess(true);
        return new ResponseEntity<ListDataDTO<StudyCourseEntity>>(res, HttpStatus.OK);

    }

    @GetMapping("/modules")
    public ResponseEntity<ListDataDTO<ModuleEntity>> getModules() {
        ListDataDTO<ModuleEntity> res = new ListDataDTO<>();
        List<ModuleEntity> data = moduleRepo.findByStudyCourse(1);
        res.setData(data);
        res.setSuccess(true);
        return new ResponseEntity<ListDataDTO<ModuleEntity>>(res, HttpStatus.OK);

    }

}
