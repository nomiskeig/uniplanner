package de.giek.uniplanner.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import de.giek.uniplanner.model.MappingEntity;

public interface MappingRepo extends JpaRepository<MappingEntity, Integer> {
    List<MappingEntity> findByStudyCourse(int studyCourse);
}
