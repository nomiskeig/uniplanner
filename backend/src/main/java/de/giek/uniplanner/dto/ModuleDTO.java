package de.giek.uniplanner.dto;

import java.util.HashSet;
import java.util.Set;

import de.giek.uniplanner.model.CategoryEntity;
import de.giek.uniplanner.model.ModuleEntity;

public class ModuleDTO {
    private int moduleID;
    private String stringID;

	private String name;

	private int ects;
    private Set<CategoryDTO> categories;
    private String turnus;
    private String responsible;
    private String requirements;
    private String recommendations;
    private String content;

	private String qualificationGoals;

	public ModuleDTO(ModuleEntity me, boolean addCategories) {
        this.moduleID = me.getModule_id();
        this.stringID = me.getModule_string_id();
        this.name = me.getName();
        this.ects = me.getEcts();
        this.turnus = me.getTurnus();
        this.responsible = me.getResponsible();
        this.requirements = me.getRequirements();
        this.recommendations = me.getRecommendations();
        this.content = me.getContent();
        this.qualificationGoals = me.getQualificationGoals();
        if (addCategories) {
            this.categories = mapEntitiesToDTOs(me.getCategories());
        } else {
            this.categories = new HashSet<>();
        }
    }

	public int getModuleID() {
		return moduleID;
	}

	public void setModuleID(int moduleID) {
		this.moduleID = moduleID;
	}

	public String getResponsible() {
		return responsible;
	}

	public void setResponsible(String responsible) {
		this.responsible = responsible;
	}

	public String getRequirements() {
		return requirements;
	}

	public void setRequirements(String requirements) {
		this.requirements = requirements;
	}

	public String getRecommendations() {
		return recommendations;
	}

	public void setRecommendations(String recommendations) {
		this.recommendations = recommendations;
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

    public String getStringID() {
        return stringID;
    }

    public void setStringID(String stringID) {
        this.stringID = stringID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getEcts() {
        return ects;
    }

    public void setEcts(int ects) {
        this.ects = ects;
    }

    public Set<CategoryDTO> getCategories() {
        return categories;
    }

    public void setCategories(Set<CategoryDTO> categories) {
        this.categories = categories;
    }

    public String getTurnus() {
        return turnus;
    }

    public void setTurnus(String turnus) {
        this.turnus = turnus;
    }

    private Set<CategoryDTO> mapEntitiesToDTOs(Set<CategoryEntity> ces) {
        Set<CategoryDTO> res = new HashSet<>();
        for (CategoryEntity ce : ces) {
            res.add(new CategoryDTO(ce, false, false));
        }
        return res;
    }

}
