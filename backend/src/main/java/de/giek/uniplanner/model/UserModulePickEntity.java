package de.giek.uniplanner.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "userModulePick")
public class UserModulePickEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer userModulePick_id;


    private int module;
    private int category;
    private int user;
    @JsonIgnore
	public Integer getUserModulePick_id() {
		return userModulePick_id;
	}
	public void setUserModulePick_id(Integer userModulePick_id) {
		this.userModulePick_id = userModulePick_id;
	}
    @JsonProperty("moduleID")
	public int getModule() {
		return module;
	}
	public void setModule(int module) {
		this.module = module;
	}
    @JsonProperty("categoryID")
	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
	}
    @JsonIgnore
	public int getUser() {
		return user;
	}
	public void setUser(int user) {
		this.user = user;
	}
}
