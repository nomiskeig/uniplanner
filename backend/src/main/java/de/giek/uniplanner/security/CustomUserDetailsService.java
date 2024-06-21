package de.giek.uniplanner.security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import de.giek.uniplanner.model.UserEntity;
import de.giek.uniplanner.repository.UserRepo;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("loading username " + username);
        UserEntity userEntity = userRepo.findByUsername(username)
                .orElseThrow(() ->{System.out.println("throwing"); return new UsernameNotFoundException("Username " + username + " not found.");});
                
        return new User(userEntity.getUsername(), userEntity.getPassword(), new ArrayList<>());

    }

}
