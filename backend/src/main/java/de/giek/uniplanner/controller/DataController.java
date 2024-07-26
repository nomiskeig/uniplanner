package de.giek.uniplanner.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import de.giek.uniplanner.dto.CategoryDTO;
import de.giek.uniplanner.dto.CategoryTypeDTO;
import de.giek.uniplanner.dto.ListDataDTO;
import de.giek.uniplanner.dto.ModuleDTO;
import de.giek.uniplanner.dto.ModulePartDTO;
import de.giek.uniplanner.dto.SemesterDTO;
import de.giek.uniplanner.dto.StudyCourseDTO;
import de.giek.uniplanner.dto.SuccessAndMessageDTO;
import de.giek.uniplanner.model.CategoryEntity;
import de.giek.uniplanner.model.CategoryTypeEntity;
import de.giek.uniplanner.model.MappingEntity;
import de.giek.uniplanner.model.ModuleEntity;
import de.giek.uniplanner.model.ModulePartEntity;
import de.giek.uniplanner.model.SemesterEntity;
import de.giek.uniplanner.model.StudyCourseEntity;
import de.giek.uniplanner.repository.CategoryRepo;
import de.giek.uniplanner.repository.CategoryTypeRepo;
import de.giek.uniplanner.repository.MappingRepo;
import de.giek.uniplanner.repository.ModulePartRepo;
import de.giek.uniplanner.repository.ModuleRepo;
import de.giek.uniplanner.repository.SemesterRepo;
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

    @Autowired
    private SemesterRepo semesterRepo;
    @Autowired
    private ModulePartRepo modulePartRepo;
    @GetMapping("/studyCourses")
    public ResponseEntity<ListDataDTO<StudyCourseEntity>> getStudyCourses() {
        ListDataDTO<StudyCourseEntity> res = new ListDataDTO<>();
        List<StudyCourseEntity> data = studyCourseRepo.findAll();
        res.setData(data);
        res.setSuccess(true);
        return new ResponseEntity<ListDataDTO<StudyCourseEntity>>(res, HttpStatus.OK);

    }
    @GetMapping("/semesters") 
    public ResponseEntity<ListDataDTO<SemesterDTO>> getSemesters() {
        ListDataDTO<SemesterDTO> res = new ListDataDTO<>();
        List<SemesterEntity> data = semesterRepo.findAll();
        List<SemesterDTO> dataToSend = data.stream().map(s -> new SemesterDTO(s)).toList();
        res.setData(dataToSend);
        res.setSuccess(true);
        return new ResponseEntity<ListDataDTO<SemesterDTO>>(res, HttpStatus.OK);


    }

    @GetMapping("/modules/{stringModuleID}")
    public ResponseEntity getModule(@PathVariable String stringModuleID) {
        Optional<ModuleEntity> maybeModule = moduleRepo.findByStringID(stringModuleID);
        if (maybeModule.isEmpty()) {
            SuccessAndMessageDTO res = new SuccessAndMessageDTO();
            res.setMessage("There is no module with id " + stringModuleID + ".");
            res.setSuccess(false);
            return new ResponseEntity<SuccessAndMessageDTO>(res, HttpStatus.CONFLICT);

        }
        ModuleDTO moduledto = new ModuleDTO(maybeModule.get(), true);
        return new ResponseEntity<ModuleDTO>(moduledto, HttpStatus.OK);

    }

    @GetMapping("/moduleParts/{stringModulePartID}")
    public ResponseEntity getModuleParts(@PathVariable String stringModulePartID) {
        Optional<ModulePartEntity> maybeModule = modulePartRepo.findByStringID(stringModulePartID);
        if (maybeModule.isEmpty()) {
            SuccessAndMessageDTO res = new SuccessAndMessageDTO();
            res.setMessage("There is no module part with id " + stringModulePartID + ".");
            res.setSuccess(false);
            return new ResponseEntity<SuccessAndMessageDTO>(res, HttpStatus.CONFLICT);

        }
        ModulePartDTO moduledto = new ModulePartDTO(maybeModule.get());
        return new ResponseEntity<ModulePartDTO>(moduledto, HttpStatus.OK);

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
