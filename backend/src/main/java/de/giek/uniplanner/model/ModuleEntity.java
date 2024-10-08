package de.giek.uniplanner.model;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "module")
public class ModuleEntity {
    @Id
    private int module_id;

    private String module_string_id;
    private int studyCourse;
    private String name;
    private String responsible;
    private String turnus;
    private int ects;
    private CategoryTypeEntity type;
    @Column(columnDefinition = "TEXT")
    private String requirements;

	@Column(columnDefinition = "TEXT")
    private String successControl;

	@Column(columnDefinition = "TEXT")
    private String content;
    @Column(columnDefinition = "TEXT")
    private String qualificationGoals;
    @Column(columnDefinition = "TEXT")
    private String recommendations;
    @ManyToMany(mappedBy ="modules")
    private Set<CategoryEntity> categories;
    private boolean isPractical;
    private boolean isSeminar;
    private boolean isStammmodul;

	@ManyToMany(mappedBy ="modules")
    private Set<ModulePartEntity> parts;

	public CategoryTypeEntity getType() {
		return type;
	}

	public boolean isPractical() {
		return isPractical;
	}

	public void setPractical(boolean isPractical) {
		this.isPractical = isPractical;
	}

	public boolean isSeminar() {
		return isSeminar;
	}
	public void setSeminar(boolean isSeminar) {
		this.isSeminar = isSeminar;
	}
    public boolean isStammmodul() {
		return isStammmodul;
	}


    public void setStammmodul(boolean isStammmodul) {
		this.isStammmodul = isStammmodul;
	}

    public Set<ModulePartEntity> getParts() {
		return parts;
	}

	public void setParts(Set<ModulePartEntity> parts) {
		this.parts = parts;
	}

	public void setType(CategoryTypeEntity type) {
		this.type = type;
	}

    public Set<CategoryEntity> getCategories() {
		return categories;
	}

	public void setCategories(Set<CategoryEntity> categories) {
		this.categories = categories;
	}

	public String getTurnus() {
        return turnus;
    }

    public void setTurnus(String turnus) {
        this.turnus = turnus;
    }

    public int getModule_id() {
        return module_id;
    }

    public void setModule_id(int module_id) {
        this.module_id = module_id;
    }

    public String getModule_string_id() {
        return module_string_id;
    }

    public void setModule_string_id(String module_string_id) {
        this.module_string_id = module_string_id;
    }

    public int getStudyCourse() {
        return studyCourse;
    }

    public void setStudyCourse(int studyCourse) {
        this.studyCourse = studyCourse;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getResponsible() {
        return responsible;
    }

    public void setResponsible(String responsible) {
        this.responsible = responsible;
    }

    public int getEcts() {
        return ects;
    }

    public void setEcts(int ects) {
        this.ects = ects;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public String getSuccessControl() {
        return successControl;
    }

    public void setSuccessControl(String successControl) {
        this.successControl = successControl;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getQualificationGoals() {
        return qualificationGoals;
    }

    public void setQualificationGoals(String qualificationGoals) {
        this.qualificationGoals = qualificationGoals;
    }

    public String getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(String recommendations) {
        this.recommendations = recommendations;
    }

}
