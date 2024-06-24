package de.giek.uniplanner.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import de.giek.uniplanner.model.StudyCourseEntity;

public interface StudyCourseRepo extends JpaRepository<StudyCourseEntity, Integer>  {
    List<StudyCourseEntity> findAll();

}
