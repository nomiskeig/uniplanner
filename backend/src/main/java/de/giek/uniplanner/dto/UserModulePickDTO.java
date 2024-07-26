package de.giek.uniplanner.dto;

import de.giek.uniplanner.model.UserModulePickEntity;

public class UserModulePickDTO {
    private ModuleDTO module;
    private CategoryDTO category;
    private SemesterDTO semester;

    public UserModulePickDTO(UserModulePickEntity umpe) {
        this.module = new ModuleDTO(umpe.getModule(), false);
        this.category = new CategoryDTO(umpe.getCategory(), false, false);
        this.semester = umpe.getSemester() != null ?new SemesterDTO(umpe.getSemester()) : null;

    }

	public SemesterDTO getSemester() {
		return semester;
	}

	public void setSemester(SemesterDTO semester) {
		this.semester = semester;
	}

    public ModuleDTO getModule() {
        return module;
    }

    public void setModule(ModuleDTO module) {
        this.module = module;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }
}
