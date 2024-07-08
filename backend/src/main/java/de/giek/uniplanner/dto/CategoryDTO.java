package de.giek.uniplanner.dto;

import java.util.HashSet;
import java.util.Set;

import de.giek.uniplanner.model.CategoryEntity;
import de.giek.uniplanner.model.ModuleEntity;

public class CategoryDTO {
    private int categoryID;
    private String name;
    private int minECTS;
    private int maxECTS;
    private Set<ModuleDTO> modules;
    private CategoryTypeDTO type;

    public CategoryDTO(CategoryEntity ce, boolean addModules, boolean addTypeCategories) {
        this.categoryID = ce.getCategory_id();
        this.name = ce.getName();
        this.minECTS = ce.getMinECTS();
        this.maxECTS = ce.getMaxECTS();
        if (addTypeCategories) {

        this.type = new CategoryTypeDTO(ce.getType(), true);
        } else {

        this.type = new CategoryTypeDTO(ce.getType(), false);
        }
        if (addModules) {
        this.modules = mapEntitiesToDTOs(ce.getModules());
        } else {
            this.modules = new HashSet<>();
        }
    }

    private Set<ModuleDTO> mapEntitiesToDTOs(Set<ModuleEntity> mes) {
        Set<ModuleDTO> res = new HashSet<>();
        for (ModuleEntity me : mes) {
            res.add(new ModuleDTO(me, false));
        }
        return res;

    }

    public int getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(int categoryID) {
        this.categoryID = categoryID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getMinECTS() {
        return minECTS;
    }

    public void setMinECTS(int minECTS) {
        this.minECTS = minECTS;
    }

    public int getMaxECTS() {
        return maxECTS;
    }

    public void setMaxECTS(int maxECTS) {
        this.maxECTS = maxECTS;
    }

    public Set<ModuleDTO> getModules() {
        return modules;
    }

    public void setModules(Set<ModuleDTO> modules) {
        this.modules = modules;
    }

	public CategoryTypeDTO getType() {
		return type;
	}

	public void setType(CategoryTypeDTO type) {
		this.type = type;
	}

}
