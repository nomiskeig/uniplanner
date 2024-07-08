package de.giek.uniplanner.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import de.giek.uniplanner.model.UserEntity;
import de.giek.uniplanner.model.UserModulePickEntity;

public interface UserModulePickRepo extends JpaRepository<UserModulePickEntity, Integer> {
    List<UserModulePickEntity> findByUser(UserEntity user);
    //UserModulePickEntity findByUserAndCategoryAndModule(UserEntity user,  int categoryID, int moduleID);
}
