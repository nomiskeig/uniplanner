package de.giek.uniplanner.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import de.giek.uniplanner.model.ModuleEntity;

public interface ModuleRepo extends JpaRepository<ModuleEntity, Integer> {
    List<ModuleEntity> findByStudyCourse(int studycourse);


    @Query("select m from ModuleEntity m join m.categories c where m.module_id = :moduleID and c.category_id = :categoryID")
	Optional<ModuleEntity> findByModuleIdAndCategoryID(int moduleID, int categoryID);


    @Query("select m from ModuleEntity m where m.module_string_id = :stringModuleID")
	Optional<ModuleEntity> findByStringID(String stringModuleID);
}
