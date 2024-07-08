package de.giek.uniplanner.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="userCategoryPick")
public class UserCategoryPickEntity {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Integer userCategoryPick_id;

    @OneToOne
    @JoinColumn(name ="user", referencedColumnName = "user_id")
    private UserEntity user; 

    @ManyToOne
    @JoinColumn(name="indepth1", referencedColumnName =  "category_id")
    private CategoryEntity indepth1;
    @ManyToOne
    @JoinColumn(name="indepth2", referencedColumnName =  "category_id")
    private CategoryEntity indepth2;
    @ManyToOne
    @JoinColumn(name="supplementary", referencedColumnName =  "category_id")
    private CategoryEntity supplementary;

    @JsonIgnore
	public Integer getUserCategoryPick_id() {
		return userCategoryPick_id;
	}
	public void setUserCategoryPick_id(Integer userCategoryPick_id) {
		this.userCategoryPick_id = userCategoryPick_id;
	}
	public UserEntity getUser() {
		return user;
	}
	public void setUser(UserEntity user) {
		this.user = user;
	}
	public CategoryEntity getIndepth1() {
		return indepth1;
	}
	public void setIndepth1(CategoryEntity indepth1) {
		this.indepth1 = indepth1;
	}
	public CategoryEntity getIndepth2() {
		return indepth2;
	}
	public void setIndepth2(CategoryEntity indepth2) {
		this.indepth2 = indepth2;
	}
	public CategoryEntity getSupplementary() {
		return supplementary;
	}
	public void setSupplementary(CategoryEntity supplementary) {
		this.supplementary = supplementary;
	}


}
