package de.giek.uniplanner.controller;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.giek.uniplanner.dto.CategoryPickDTO;
import de.giek.uniplanner.dto.ListDataDTO;
import de.giek.uniplanner.dto.SuccessAndMessageDTO;
import de.giek.uniplanner.dto.UserCategoryPickDTO;
import de.giek.uniplanner.dto.UserModulePickDTO;
import de.giek.uniplanner.dto.UserPickDTO;
import de.giek.uniplanner.model.CategoryEntity;
import de.giek.uniplanner.model.ModuleEntity;
import de.giek.uniplanner.model.UserCategoryPickEntity;
import de.giek.uniplanner.model.UserEntity;
import de.giek.uniplanner.model.UserModulePickEntity;
import de.giek.uniplanner.repository.CategoryRepo;
import de.giek.uniplanner.repository.ModuleRepo;
import de.giek.uniplanner.repository.UserCategoryPickRepo;
import de.giek.uniplanner.repository.UserModulePickRepo;
import de.giek.uniplanner.repository.UserRepo;

@RestController
@RequestMapping("/api/v1/plan")
public class PlanController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ModuleRepo moduleRepo;
    @Autowired
    private CategoryRepo categoryRepo;
    @Autowired

    private UserCategoryPickRepo ucpRepo;
    @Autowired
    private UserModulePickRepo umpRepo;

    @PutMapping("/updateCategoryPicks")
    public ResponseEntity<SuccessAndMessageDTO> updateUserPicks(Authentication auth,
            @RequestBody CategoryPickDTO picks) {

        UserEntity user = userRepo.findByUsername(auth.getName()).orElseThrow();
        UserCategoryPickEntity ucpe = ucpRepo.findByUser(user);
        Optional<CategoryEntity> maybeIndepth1 = categoryRepo.findById(picks.getIndepth1());
        if (maybeIndepth1.isEmpty()) {
            SuccessAndMessageDTO res = new SuccessAndMessageDTO();
            res.setMessage("There is no category with id " + picks.getIndepth1() + ".");
            res.setSuccess(false);
            return new ResponseEntity<SuccessAndMessageDTO>(res, HttpStatus.CONFLICT);

        }
        Optional<CategoryEntity> maybeIndepth2 = categoryRepo.findById(picks.getIndepth2());
        if (maybeIndepth2.isEmpty()) {
            SuccessAndMessageDTO res = new SuccessAndMessageDTO();
            res.setMessage("There is no category with id " + picks.getIndepth2() + ".");
            res.setSuccess(false);
            return new ResponseEntity<SuccessAndMessageDTO>(res, HttpStatus.CONFLICT);

        }

        Optional<CategoryEntity> maybeSupplementary = categoryRepo.findById(picks.getSupplementary());
        if (maybeIndepth2.isEmpty()) {
            SuccessAndMessageDTO res = new SuccessAndMessageDTO();
            res.setMessage("There is no category with id " + picks.getSupplementary() + ".");
            res.setSuccess(false);
            return new ResponseEntity<SuccessAndMessageDTO>(res, HttpStatus.CONFLICT);
        }
        if (picks.getIndepth1() == picks.getIndepth2()) {
            SuccessAndMessageDTO res = new SuccessAndMessageDTO();
            res.setMessage("Cannot pick the same indepth category twice.");
            res.setSuccess(false);
            return new ResponseEntity<SuccessAndMessageDTO>(res, HttpStatus.CONFLICT);

        }


        

        // delete picks of the changed categories
        if (ucpe.getIndepth1().getCategory_id() != picks.getIndepth1()) {
            // indepth1 changed
            umpRepo.deleteByCategoryID(ucpe.getIndepth1().getCategory_id());
        }
        if (ucpe.getIndepth2().getCategory_id() != picks.getIndepth2()) {
            // indepth2 changed
            umpRepo.deleteByCategoryID(ucpe.getIndepth2().getCategory_id());
        }
        if (ucpe.getSupplementary().getCategory_id() != picks.getSupplementary()) {
            // supplementary changed
            umpRepo.deleteByCategoryID(ucpe.getSupplementary().getCategory_id());
        }
        CategoryEntity indepth1 = maybeIndepth1.get();
        CategoryEntity indepth2 = maybeIndepth2.get();

        CategoryEntity supplementary = maybeSupplementary.get();
        ucpe.setIndepth1(indepth1);
        ucpe.setIndepth2(indepth2);
        ucpe.setSupplementary(supplementary);

        ucpRepo.save(ucpe);


        SuccessAndMessageDTO res = new SuccessAndMessageDTO();
        res.setMessage("Success");
        res.setSuccess(true);
        return new ResponseEntity<SuccessAndMessageDTO>(res, HttpStatus.OK);

    }

    @GetMapping("/getCategoryPicks")
    public ResponseEntity getUserPicks(Authentication auth) {
        Optional<UserEntity> maybeUser = userRepo.findByUsername(auth.getName());
        if (!maybeUser.isPresent()) {
            return new ResponseEntity<String>("Cannot find user with username " + auth.getName(), HttpStatus.NOT_FOUND);
        }
        UserEntity user = maybeUser.get();

        UserCategoryPickEntity ucpe = ucpRepo.findByUser(user);
        UserCategoryPickDTO dto = new UserCategoryPickDTO(ucpe);
        return new ResponseEntity<UserCategoryPickDTO>(dto, HttpStatus.OK);

    }

    @PostMapping("/addModulePick")
    public ResponseEntity<SuccessAndMessageDTO> addModulePick(Authentication auth, @RequestBody UserPickDTO pick) {
        UserEntity user = userRepo.findByUsername(auth.getName()).orElseThrow();
        Optional<ModuleEntity> maybeModule = moduleRepo.findByModuleIdAndCategoryID(pick.getModuleID(),
                pick.getCategoryID());
        Set<UserModulePickEntity> maybeUmpe = umpRepo.findByUserAndModule(user, pick.getModuleID());
        if (!maybeUmpe.isEmpty()) {
            SuccessAndMessageDTO res = new SuccessAndMessageDTO();
            res.setMessage("Module with id " + pick.getModuleID() + " is already picked.");
            res.setSuccess(false);
            return new ResponseEntity<SuccessAndMessageDTO>(res, HttpStatus.CONFLICT);

        }
        if (maybeModule.isEmpty()) {
            SuccessAndMessageDTO res = new SuccessAndMessageDTO();
            res.setMessage("Module with id " + pick.getModuleID() + " can not be picked in category with id "
                    + pick.getCategoryID());
            res.setSuccess(false);
            return new ResponseEntity<SuccessAndMessageDTO>(res, HttpStatus.CONFLICT);
        }
        ModuleEntity module = maybeModule.get();
        CategoryEntity category = categoryRepo.findById(pick.getCategoryID()).orElseThrow();

        UserModulePickEntity umpe = new UserModulePickEntity();
        umpe.setModule(module);
        umpe.setUser(user);
        umpe.setCategory(category);
        umpRepo.save(umpe);
        SuccessAndMessageDTO res = new SuccessAndMessageDTO();
        res.setMessage("Success");
        res.setSuccess(true);
        return new ResponseEntity<SuccessAndMessageDTO>(res, HttpStatus.OK);
    }

    @GetMapping("/getModulePicks")
    public ResponseEntity getModulePicks(Authentication auth) {
        Optional<UserEntity> user = userRepo.findByUsername(auth.getName());
        if (!user.isPresent()) {
            return new ResponseEntity<String>("Cannot find user with username " + auth.getName(), HttpStatus.NOT_FOUND);
        }

        List<UserModulePickEntity> umpes = umpRepo.findByUser(user.get());
        ListDataDTO<UserModulePickDTO> res = new ListDataDTO<>();
        List<UserModulePickDTO> dtos = new ArrayList<>();
        for (UserModulePickEntity umpe : umpes) {
            dtos.add(new UserModulePickDTO(umpe));
        }
        res.setData(dtos);
        res.setSuccess(true);
        return new ResponseEntity<ListDataDTO<UserModulePickDTO>>(res, HttpStatus.OK);

    }

    @PostMapping("/removeModulePick")
    public ResponseEntity removeModulePick(Authentication auth, @RequestBody UserPickDTO pickToRemove) {
        UserEntity user = userRepo.findByUsername(auth.getName()).orElseThrow();

        Optional<UserModulePickEntity> maybeUmpe = umpRepo.findByUserAndCategoryAndModule(user,
                pickToRemove.getCategoryID(), pickToRemove.getModuleID());
        if (maybeUmpe.isEmpty()) {
            SuccessAndMessageDTO res = new SuccessAndMessageDTO();
            res.setMessage("Module with id " + pickToRemove.getModuleID() + " is not picked in category with id "
                    + pickToRemove.getCategoryID());
            res.setSuccess(false);
            return new ResponseEntity<SuccessAndMessageDTO>(res, HttpStatus.CONFLICT);
        }
        UserModulePickEntity umpe = maybeUmpe.get();
         umpRepo.delete(umpe);
        SuccessAndMessageDTO res = new SuccessAndMessageDTO();
        res.setMessage("Success");
        res.setSuccess(true);
        return new ResponseEntity<SuccessAndMessageDTO>(res, HttpStatus.OK);
    }
}
