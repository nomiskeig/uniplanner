package de.giek.uniplanner.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import de.giek.uniplanner.model.ModuleEntity;
import de.giek.uniplanner.model.ModulePartEntity;

public interface ModulePartRepo extends JpaRepository<ModulePartEntity, Integer> {

    @Query("select m from ModulePartEntity m where m.stringID = :stringModulePartID")
	Optional<ModulePartEntity> findByStringID(String stringModulePartID);
}
