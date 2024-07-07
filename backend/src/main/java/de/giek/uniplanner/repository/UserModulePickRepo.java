package de.giek.uniplanner.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import de.giek.uniplanner.model.UserModulePickEntity;

public interface UserModulePickRepo extends JpaRepository<UserModulePickEntity, Integer> {
    List<UserModulePickEntity> findByUser(int userID);
    UserModulePickEntity findByUserAndCategoryAndModule(int userID, int categoryID, int moduleID);
}
