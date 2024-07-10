package de.giek.uniplanner.repository;


import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import de.giek.uniplanner.model.UserEntity;
import de.giek.uniplanner.model.UserModulePickEntity;
import jakarta.transaction.Transactional;

public interface UserModulePickRepo extends JpaRepository<UserModulePickEntity, Integer> {
    List<UserModulePickEntity> findByUser(UserEntity user);

    @Query("select umpe from UserModulePickEntity umpe where umpe.user = :user and umpe.module.module_id = :moduleID and umpe.category.category_id = :categoryID")
	Optional<UserModulePickEntity> findByUserAndCategoryAndModule(UserEntity user, int categoryID, int moduleID);

    @Query("select umpe from UserModulePickEntity umpe where umpe.user = :user and umpe.module.module_id = :moduleID")
	Set<UserModulePickEntity> findByUserAndModule(UserEntity user, int moduleID);

    @Transactional
    @Modifying
    @Query("delete from UserModulePickEntity umpe where umpe.category.category_id = :category_id")
	void deleteByCategoryID(int category_id);
}
