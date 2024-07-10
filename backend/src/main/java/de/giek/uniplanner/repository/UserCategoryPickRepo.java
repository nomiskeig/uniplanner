package de.giek.uniplanner.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import de.giek.uniplanner.model.UserCategoryPickEntity;
import de.giek.uniplanner.model.UserEntity;

public interface UserCategoryPickRepo extends JpaRepository<UserCategoryPickEntity, Integer>  {
    List<UserCategoryPickEntity> findAll();
    @Query("select ucpe from UserCategoryPickEntity ucpe where ucpe.user = :user")
    UserCategoryPickEntity findByUser(UserEntity user);

}
