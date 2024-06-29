package de.giek.uniplanner.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name ="moduleToCategoryMapping")
public class MappingEntity {
    @Id
    private int moduleToCategoryMapping_id;
    private int module;
    private int category;
    private int studyCourse;

    @JsonIgnore
	public int getModuleToCategoryMapping_id() {
		return moduleToCategoryMapping_id;
	}
	public void setModuleToCategoryMapping_id(int moduleToCategoryMapping_id) {
		this.moduleToCategoryMapping_id = moduleToCategoryMapping_id;
	}
	public int getModule() {
		return module;
	}
	public void setModule(int module) {
		this.module = module;
	}
	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
	}
    @JsonIgnore
	public int getStudyCourse() {
		return studyCourse;
	}
	public void setStudyCourse(int studyCourse) {
		this.studyCourse = studyCourse;
	}
}
