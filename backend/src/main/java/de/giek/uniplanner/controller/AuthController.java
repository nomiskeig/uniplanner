package de.giek.uniplanner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.giek.uniplanner.dto.UserAuthDTO;
import de.giek.uniplanner.dto.LoginResponseDTO;
import de.giek.uniplanner.dto.SuccessAndMessageDTO;
import de.giek.uniplanner.model.CategoryEntity;
import de.giek.uniplanner.model.UserCategoryPickEntity;
import de.giek.uniplanner.model.UserEntity;
import de.giek.uniplanner.repository.CategoryRepo;
import de.giek.uniplanner.repository.UserCategoryPickRepo;
import de.giek.uniplanner.repository.UserRepo;
import de.giek.uniplanner.security.JwtGenerator;

@RestController
@RequestMapping("/api/v1/users")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtGenerator jwtGenerator;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private UserCategoryPickRepo ucpRepo;

    @Autowired
    private CategoryRepo catRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<SuccessAndMessageDTO> register(@RequestBody UserAuthDTO registerDTO) {
        SuccessAndMessageDTO response = new SuccessAndMessageDTO();
        if (userRepo.existsByUsername(registerDTO.getUsername())) {
            response.setMessage("Username already registered!");
            response.setSuccess(false);
            return new ResponseEntity<SuccessAndMessageDTO>(response, HttpStatus.BAD_REQUEST);
        }
        System.out.println("username: " + registerDTO.getUsername());

        String password = registerDTO.getPassword();
        String username = registerDTO.getUsername();
        if (username.equals("")) {
            response.setMessage("Username can not be empty.");
            response.setSuccess(false);
            return new ResponseEntity<SuccessAndMessageDTO>(response, HttpStatus.BAD_REQUEST);
        }
        if (password.length() < 5) {
            response.setMessage("Password too short. Five characters are required.");
            response.setSuccess(false);
            return new ResponseEntity<SuccessAndMessageDTO>(response, HttpStatus.BAD_REQUEST);

        }
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(username);
        userEntity.setPassword(passwordEncoder.encode(password));


        UserCategoryPickEntity ucpe = new UserCategoryPickEntity();
        CategoryEntity indepth1 = catRepo.findById(2).orElseThrow();
        CategoryEntity indepth2 = catRepo.findById(3).orElseThrow();
        CategoryEntity supplemenary = catRepo.findById(20).orElseThrow();
        ucpe.setIndepth1(indepth1);
        ucpe.setIndepth2(indepth2);
        ucpe.setSupplementary(supplemenary);

        UserEntity res = userRepo.save(userEntity);
        ucpe.setUser(userEntity);
        ucpRepo.save(ucpe);
        response.setMessage("User created successfully");
        response.setSuccess(true);

        return new ResponseEntity<SuccessAndMessageDTO>(response, HttpStatus.CREATED);

    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody UserAuthDTO loginDTO) {
        System.out.println("loggin in");
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword()));
        System.out.println("after authentication");
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtGenerator.generateToken(authentication);
        LoginResponseDTO response = new LoginResponseDTO();
        response.setSuccess(true);
        response.setMessage("Login successfull");
        response.setToken(token);
        return new ResponseEntity<LoginResponseDTO>(response, HttpStatus.OK);

    }

}
