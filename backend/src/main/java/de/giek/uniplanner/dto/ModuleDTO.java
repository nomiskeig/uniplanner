package de.giek.uniplanner.dto;

import java.util.HashSet;
import java.util.Set;

import de.giek.uniplanner.model.CategoryEntity;
import de.giek.uniplanner.model.ModuleEntity;

public class ModuleDTO {
    private int moduleID;
    public int getModuleID() {
		return moduleID;
	}

	public void setModuleID(int moduleID) {
		this.moduleID = moduleID;
	}

	private String stringID;
    private String name;
    private int ects;
    private Set<CategoryDTO> categories;
    private String turnus;

    public ModuleDTO(ModuleEntity me, boolean addCategories) {
        this.moduleID = me.getModule_id();
        this.stringID = me.getModule_string_id();
        this.name = me.getName();
        this.ects = me.getEcts();
        this.turnus = me.getTurnus();
        if (addCategories) {
            this.categories = mapEntitiesToDTOs(me.getCategories());
        } else {
            this.categories = new HashSet<>();
        }
    }

    private Set<CategoryDTO> mapEntitiesToDTOs(Set<CategoryEntity> ces) {
        Set<CategoryDTO> res = new HashSet<>();
        for (CategoryEntity ce : ces) {
            res.add(new CategoryDTO(ce, false, false));
        }
        return res;
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

}
