package de.giek.uniplanner.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.giek.uniplanner.dto.CategoryPickDTO;
import de.giek.uniplanner.dto.SuccessAndMessageDTO;
import de.giek.uniplanner.model.UserCategoryPickEntity;
import de.giek.uniplanner.model.UserEntity;
import de.giek.uniplanner.repository.UserCategoryPickRepo;
import de.giek.uniplanner.repository.UserRepo;

@RestController
@RequestMapping("/api/v1/plan")
public class PlanController {
@Autowired
private UserRepo userRepo;
@Autowired 
    private UserCategoryPickRepo ucpRepo;

    @PutMapping("/updateCategoryPicks")
    public ResponseEntity<SuccessAndMessageDTO> updateUserPicks(Authentication auth, @RequestBody CategoryPickDTO picks) {
        System.out.println("called update userpicks");
        System.out.println("user: "  + auth.getName());
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
        Optional<UserEntity> user= userRepo.findByUsername(auth.getName());
        if (!user.isPresent()) {
            return new ResponseEntity<String>("Cannot find user with username " + auth.getName(), HttpStatus.NOT_FOUND);
        }

        UserCategoryPickEntity ucpe = ucpRepo.findByUser(user.get().getUser_id());
        return new ResponseEntity<UserCategoryPickEntity>(ucpe, HttpStatus.OK);

        
    }

}


