package de.giek.uniplanner.model;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "category")
public class CategoryEntity {
    @Id
    private int category_id;
    private String name;
    @Column(columnDefinition = "TEXT")
    private String info;
    private int studyCourse;
    private int minECTS;
    private int maxECTS;

    @ManyToOne
    @JoinColumn(name = "type", referencedColumnName = "categoryType_id")
    private CategoryTypeEntity type;

    @ManyToMany
    @JoinTable(name = "moduleToCategoryMapping", joinColumns = @JoinColumn(name = "category", referencedColumnName = "category_id"), inverseJoinColumns = @JoinColumn(name = "module", referencedColumnName = "module_id"))
    private Set<ModuleEntity> modules;

    public Set<ModuleEntity> getModules() {
        return modules;
    }

    public void setModules(Set<ModuleEntity> modules) {
        this.modules = modules;
    }

    public int getStudyCourse() {
        return studyCourse;
    }

    public void setStudyCourse(int studyCourse) {
        this.studyCourse = studyCourse;
    }

    public int getCategory_id() {
        return category_id;
    }

    public void setCategory_id(int category_id) {
        this.category_id = category_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CategoryTypeEntity getType() {
        return type;
    }



    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
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

    public void setType(CategoryTypeEntity type) {
        this.type = type;
    }

}
