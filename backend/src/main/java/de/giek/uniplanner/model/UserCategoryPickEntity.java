package de.giek.uniplanner.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="userCategoryPick")
public class UserCategoryPickEntity {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Integer userCategoryPick_id;

    private Integer user; 

    private Integer indepth1;
    private Integer indepth2;
    private Integer supplementary;
    @JsonIgnore
	public Integer getUserCategoryPick_id() {
		return userCategoryPick_id;
	}
	public void setUserCategoryPick_id(Integer userCategoryPick_id) {
		this.userCategoryPick_id = userCategoryPick_id;
	}
    @JsonIgnore
	public Integer getUser() {
		return user;
	}
	public void setUser(Integer user) {
		this.user = user;
	}
	public Integer getIndepth1() {
		return indepth1;
	}
	public void setIndepth1(Integer indepth1) {
		this.indepth1 = indepth1;
	}
	public Integer getIndepth2() {
		return indepth2;
	}
	public void setIndepth2(Integer indepth2) {
		this.indepth2 = indepth2;
	}
	public Integer getSupplementary() {
		return supplementary;
	}
	public void setSupplementary(Integer supplementary) {
		this.supplementary = supplementary;
	}


}
