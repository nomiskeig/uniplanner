package de.giek.uniplanner.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import de.giek.uniplanner.model.ModuleEntity;

public interface ModuleRepo extends JpaRepository<ModuleEntity, Integer> {
    List<ModuleEntity> findByStudyCourse(int studycourse);
}
