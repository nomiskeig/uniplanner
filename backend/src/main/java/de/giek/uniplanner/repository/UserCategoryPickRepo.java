package de.giek.uniplanner.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import de.giek.uniplanner.model.UserCategoryPickEntity;

public interface UserCategoryPickRepo extends JpaRepository<UserCategoryPickEntity, Integer>  {
    List<UserCategoryPickEntity> findAll();
    UserCategoryPickEntity findByUser(Integer userID);

}
