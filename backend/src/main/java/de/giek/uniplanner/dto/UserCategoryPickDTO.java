package de.giek.uniplanner.dto;

import de.giek.uniplanner.model.UserCategoryPickEntity;

public class UserCategoryPickDTO {
    private CategoryDTO indepth1Category;
    private CategoryDTO indepth2Category;
    private CategoryDTO supplementaryCategory;

    public UserCategoryPickDTO(UserCategoryPickEntity ucpe) {
        this.indepth1Category = new CategoryDTO(ucpe.getIndepth1(), false, false);
        this.indepth2Category = new CategoryDTO(ucpe.getIndepth2(), false, false);
        this.supplementaryCategory = new CategoryDTO(ucpe.getSupplementary(), false, false);

    }

    public CategoryDTO getIndepth1Category() {
        return indepth1Category;
    }

    public void setIndepth1Category(CategoryDTO indepth1Category) {
        this.indepth1Category = indepth1Category;
    }

    public CategoryDTO getIndepth2Category() {
        return indepth2Category;
    }

    public void setIndepth2Category(CategoryDTO indepth2Category) {
        this.indepth2Category = indepth2Category;
    }

    public CategoryDTO getSupplementaryCategory() {
        return supplementaryCategory;
    }

    public void setSupplementaryCategory(CategoryDTO supplementaryCategory) {
        this.supplementaryCategory = supplementaryCategory;
    }
}
