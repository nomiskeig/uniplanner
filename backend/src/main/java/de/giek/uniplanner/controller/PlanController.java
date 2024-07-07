package de.giek.uniplanner.controller;

import java.util.List;
import java.util.Optional;

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
import de.giek.uniplanner.dto.UserPickDTO;
import de.giek.uniplanner.model.UserCategoryPickEntity;
import de.giek.uniplanner.model.UserEntity;
import de.giek.uniplanner.model.UserModulePickEntity;
import de.giek.uniplanner.repository.UserCategoryPickRepo;
import de.giek.uniplanner.repository.UserModulePickRepo;
import de.giek.uniplanner.repository.UserRepo;

@RestController
@RequestMapping("/api/v1/plan")
public class PlanController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private UserCategoryPickRepo ucpRepo;
    @Autowired
    private UserModulePickRepo umpRepo;

    @PutMapping("/updateCategoryPicks")
    public ResponseEntity<SuccessAndMessageDTO> updateUserPicks(Authentication auth,
            @RequestBody CategoryPickDTO picks) {
        System.out.println("called update userpicks");
        System.out.println("user: " + auth.getName());
        int userID = userRepo.findByUsername(auth.getName()).orElseThrow().getUser_id();
        UserCategoryPickEntity ucpe = ucpRepo.findByUser(userID);
        ucpe.setIndepth1(picks.getIndepth1());
        ucpe.setIndepth2(picks.getIndepth2());
        ucpe.setSupplementary(picks.getSupplementary());
        ucpRepo.save(ucpe);

        SuccessAndMessageDTO res = new SuccessAndMessageDTO();
        res.setMessage("Success");
        res.setSuccess(true);
        return new ResponseEntity<SuccessAndMessageDTO>(res, HttpStatus.OK);

    }

    @GetMapping("/getCategoryPicks")
    public ResponseEntity getUserPicks(Authentication auth) {
        Optional<UserEntity> user = userRepo.findByUsername(auth.getName());
        if (!user.isPresent()) {
            return new ResponseEntity<String>("Cannot find user with username " + auth.getName(), HttpStatus.NOT_FOUND);
        }

        UserCategoryPickEntity ucpe = ucpRepo.findByUser(user.get().getUser_id());
        return new ResponseEntity<UserCategoryPickEntity>(ucpe, HttpStatus.OK);

    }

    @PostMapping("/addModulePick")
    public ResponseEntity<SuccessAndMessageDTO> addModulePick(Authentication auth, @RequestBody UserPickDTO pick) {
        int userID = userRepo.findByUsername(auth.getName()).orElseThrow().getUser_id();
        UserModulePickEntity umpe = new UserModulePickEntity();
        umpe.setUser(userID);
        umpe.setModule(pick.getModuleID());
        umpe.setCategory(pick.getCategoryID());
        umpRepo.save(umpe);
        // TODO: check constraints of the pick
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
        int userID = user.get().getUser_id();

        List<UserModulePickEntity> umpes = umpRepo.findByUser(userID);
        ListDataDTO<UserModulePickEntity> res = new ListDataDTO<>();
        res.setData(umpes);
        res.setSuccess(true);
        return new ResponseEntity<ListDataDTO<UserModulePickEntity>>(res, HttpStatus.OK);

    }

    @PostMapping("/removeModulePick")
    public ResponseEntity removeModulePick(Authentication auth, @RequestBody UserPickDTO pickToRemove) {
        Optional<UserEntity> user = userRepo.findByUsername(auth.getName());
        if (!user.isPresent()) {
            return new ResponseEntity<String>("Cannot find user with username " + auth.getName(), HttpStatus.NOT_FOUND);
        }
        int userID = user.get().getUser_id();
        UserModulePickEntity umpe = umpRepo.findByUserAndCategoryAndModule(userID,pickToRemove.getCategoryID(), pickToRemove.getModuleID());
        umpRepo.delete(umpe);
        SuccessAndMessageDTO res = new SuccessAndMessageDTO();
        res.setMessage("Success");
        res.setSuccess(true);
        return new ResponseEntity<SuccessAndMessageDTO>(res, HttpStatus.OK);
    }
}
