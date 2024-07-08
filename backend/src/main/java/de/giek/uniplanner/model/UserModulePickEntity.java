package de.giek.uniplanner.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "userModulePick")
public class UserModulePickEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer userModulePick_id;


    @ManyToOne
    @JoinColumn(name = "module", referencedColumnName = "module_id")
    private ModuleEntity module;
    @ManyToOne
    @JoinColumn(name = "category", referencedColumnName =  "category_id")
    private CategoryEntity category;

    @ManyToOne
    @JoinColumn(name ="user", referencedColumnName = "user_id")
    private UserEntity user;

	public Integer getUserModulePick_id() {
		return userModulePick_id;
	}

	public void setUserModulePick_id(Integer userModulePick_id) {
		this.userModulePick_id = userModulePick_id;
	}

	public ModuleEntity getModule() {
		return module;
	}

	public void setModule(ModuleEntity module) {
		this.module = module;
	}

	public CategoryEntity getCategory() {
		return category;
	}

	public void setCategory(CategoryEntity category) {
		this.category = category;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}
}
