package de.giek.uniplanner.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "categoryType")
public class CategoryTypeEntity {
    @Id
    private int categoryType_id;
    private String name;
    private int studyCourse;
    @JsonIgnore
	public int getStudyCourse() {
		return studyCourse;
	}
	public void setStudyCourse(int studyCourse) {
		this.studyCourse = studyCourse;
	}
	public int getCategoryType_id() {
		return categoryType_id;
	}
	public void setCategoryType_id(int categoryType_id) {
		this.categoryType_id = categoryType_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

}
