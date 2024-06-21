package de.giek.uniplanner.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import de.giek.uniplanner.model.UserEntity;

public interface UserRepo extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByUsername(String username);
    boolean existsByUsername(String username);

}
