package de.giek.uniplanner.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import de.giek.uniplanner.model.UserCategoryPickEntity;

public interface UserCategoryPickRepo extends JpaRepository<UserCategoryPickEntity, Integer>  {
    List<UserCategoryPickEntity> findAll();
    @Query("select ucp from UserCategoryPickEntity ucp inner join ucp.user u where u.user_id = :userID")
    UserCategoryPickEntity findByUserID(Integer userID);

}
