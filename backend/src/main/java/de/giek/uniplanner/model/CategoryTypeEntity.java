package de.giek.uniplanner.model;

import java.io.Serializable;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "categoryType")
public class CategoryTypeEntity implements Serializable{
    @Id
    private int categoryType_id;
    private String name;
    private int studyCourse;


    @OneToMany(mappedBy="type")
    private Set<CategoryEntity> categories;


    public Set<CategoryEntity> getCategories() {
		return categories;
	}
	public void setCategories(Set<CategoryEntity> categories) {
		this.categories = categories;
	}
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
