package de.giek.uniplanner.dto;

import java.util.HashSet;
import java.util.Set;

import de.giek.uniplanner.model.CategoryEntity;
import de.giek.uniplanner.model.CategoryTypeEntity;

public class CategoryTypeDTO {
    private String name;
    private Set<CategoryDTO> categories;
    private int typeID;


    public int getTypeID() {
		return typeID;
	}
	public void setTypeID(int typeID) {
		this.typeID = typeID;
	}
	public CategoryTypeDTO(CategoryTypeEntity type, boolean addCategories) {
        this.name = type.getName();
        this.typeID = type.getCategoryType_id();
        if (addCategories) {
            this.categories = mapEntitiesToDTOs(type.getCategories());
        } else {
            this.categories = new HashSet<>();
        }
    }
    private Set<CategoryDTO> mapEntitiesToDTOs(Set<CategoryEntity> mes) {
        Set<CategoryDTO> res = new HashSet<>();
        for (CategoryEntity me : mes) {
            res.add(new CategoryDTO(me, false, false));
        }
        return res;

    }
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Set<CategoryDTO> getCategories() {
		return categories;
	}
	public void setCategories(Set<CategoryDTO> categories) {
		this.categories = categories;
	}

}
