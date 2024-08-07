package de.giek.uniplanner.dto;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import de.giek.uniplanner.model.CategoryEntity;
import de.giek.uniplanner.model.ModuleEntity;
import de.giek.uniplanner.model.ModulePartEntity;

public class ModuleDTO {
    private int moduleID;
    private String stringID;

	private String name;

	private int ects;
    private Set<CategoryDTO> categories;
    private Set<ModulePartDTO> parts;
    private String turnus;


	private String responsible;

	private String requirements;
    private String recommendations;
    private String content;
    private String successControl;
    private String qualificationGoals;
    private boolean isPractical;
    private boolean isSeminar;

	private boolean isStammmodul;

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
        this.successControl = me.getSuccessControl();
        this.qualificationGoals = me.getQualificationGoals();
        this.isPractical = me.isPractical();
        this.isSeminar = me.isSeminar();
        this.isStammmodul = me.isStammmodul();
        this.parts = me.getParts().stream().map(p -> new ModulePartDTO(p)).collect(Collectors.toSet());
        if (addCategories) {
            this.categories = mapEntitiesToDTOs(me.getCategories());
        } else {
            this.categories = new HashSet<>();
        }
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

	public Set<ModulePartDTO> getParts() {
		return parts;
	}

	public void setParts(Set<ModulePartDTO> parts) {
		this.parts = parts;
	}


	public String getSuccessControl() {
		return successControl;
	}

	public void setSuccessControl(String successControl) {
		this.successControl = successControl;
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
