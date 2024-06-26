package de.giek.uniplanner.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import de.giek.uniplanner.model.CategoryEntity;

public interface CategoryRepo extends JpaRepository<CategoryEntity, Integer> {
    List<CategoryEntity> findByStudyCourse(int studyCourse);
}
