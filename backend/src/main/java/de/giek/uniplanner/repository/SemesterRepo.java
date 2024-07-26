package de.giek.uniplanner.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import de.giek.uniplanner.model.SemesterEntity;

public interface SemesterRepo extends JpaRepository<SemesterEntity, Integer> {
    List<SemesterEntity> findAll();

}
