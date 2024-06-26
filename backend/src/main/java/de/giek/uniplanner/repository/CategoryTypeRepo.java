package de.giek.uniplanner.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import de.giek.uniplanner.model.CategoryTypeEntity;

public interface CategoryTypeRepo extends JpaRepository<CategoryTypeEntity, Integer> {
    List<CategoryTypeEntity> findByStudyCourse(int studyCourse);
}
