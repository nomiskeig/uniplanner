package de.giek.uniplanner.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import de.giek.uniplanner.dto.CategoryDTO;
import de.giek.uniplanner.dto.CategoryTypeDTO;
import de.giek.uniplanner.dto.ListDataDTO;
import de.giek.uniplanner.dto.ModuleDTO;
import de.giek.uniplanner.dto.StudyCourseDTO;
import de.giek.uniplanner.model.CategoryEntity;
import de.giek.uniplanner.model.CategoryTypeEntity;
import de.giek.uniplanner.model.MappingEntity;
import de.giek.uniplanner.model.ModuleEntity;
import de.giek.uniplanner.model.StudyCourseEntity;
import de.giek.uniplanner.repository.CategoryRepo;
import de.giek.uniplanner.repository.CategoryTypeRepo;
import de.giek.uniplanner.repository.MappingRepo;
import de.giek.uniplanner.repository.ModuleRepo;
import de.giek.uniplanner.repository.StudyCourseRepo;

@RestController
@RequestMapping("/api/v1/data")
public class DataController {

    @Autowired
    private StudyCourseRepo studyCourseRepo;
    @Autowired
    private ModuleRepo moduleRepo;

    @Autowired
    private CategoryTypeRepo ctRepo;

    @Autowired
    private CategoryRepo catRepo;

    @Autowired
    private MappingRepo mappingRepo;

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
    public ResponseEntity<ListDataDTO<ModuleDTO>> getModules(@RequestParam int studyCourseID) {
        ListDataDTO<ModuleDTO> res = new ListDataDTO<>();
        List<ModuleEntity> data = moduleRepo.findByStudyCourse(studyCourseID);
        List<ModuleDTO> dtos = new ArrayList<>();
        for (ModuleEntity me : data) {
            dtos.add(new ModuleDTO(me, true));
        }
        res.setData(dtos);
        res.setSuccess(true);

        return new ResponseEntity<ListDataDTO<ModuleDTO>>(res, HttpStatus.OK);

    }

    @GetMapping("/categoryTypes")
    public ResponseEntity<ListDataDTO<CategoryTypeDTO>> getCategoryTypes(@RequestParam int studyCourseID) {
        ListDataDTO<CategoryTypeDTO> res = new ListDataDTO<>();
        List<CategoryTypeEntity> data = ctRepo.findByStudyCourse(studyCourseID);
        List<CategoryTypeDTO> dtos = new ArrayList<>();
        for (CategoryTypeEntity cte : data) {
            dtos.add(new CategoryTypeDTO(cte, true));
        }

        res.setData(dtos);
        res.setSuccess(true);
        return new ResponseEntity<ListDataDTO<CategoryTypeDTO>>(res, HttpStatus.OK);

    }

    @GetMapping("/categories")
    public ResponseEntity<ListDataDTO<CategoryDTO>> getCategories(@RequestParam int studyCourseID) {
        ListDataDTO<CategoryDTO> res = new ListDataDTO<>();
        List<CategoryEntity> data = catRepo.findByStudyCourse(studyCourseID);
        List<CategoryDTO> dtos = new ArrayList<>();
        for (CategoryEntity ce : data) {
            dtos.add(new CategoryDTO(ce, true, true));
        }
        res.setData(dtos);
        res.setSuccess(true);
        return new ResponseEntity<ListDataDTO<CategoryDTO>>(res, HttpStatus.OK);
    }

    @GetMapping("/mappings")
    public ResponseEntity<ListDataDTO<MappingEntity>> getMappings(@RequestParam int studyCourseID) {
        ListDataDTO<MappingEntity> res = new ListDataDTO<>();
        List<MappingEntity> data = mappingRepo.findByStudyCourse(studyCourseID);
        res.setData(data);
        res.setSuccess(true);
        return new ResponseEntity<ListDataDTO<MappingEntity>>(res, HttpStatus.OK);

    }

}
