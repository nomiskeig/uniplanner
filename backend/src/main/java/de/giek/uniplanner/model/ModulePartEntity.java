package de.giek.uniplanner.model;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "modulePart")
public class ModulePartEntity {
    @Id
    private int modulePart_id;
    private String stringID;
    private String kind;

    private String name;
    private int ects;

    @Column(columnDefinition = "TEXT")
    private String successControl;

    @Column(columnDefinition = "TEXT")
    private String requirements;
    @Column(columnDefinition = "TEXT")
    private String recommendations;
    @ManyToMany
    @JoinTable(name = "modulePartToModuleMapping", joinColumns = @JoinColumn(name = "modulePart", referencedColumnName = "modulePart_id"), inverseJoinColumns = @JoinColumn(name = "module", referencedColumnName = "module_id"))
    private Set<ModuleEntity> modules;
    @OneToMany(mappedBy = "modulePart")
    private Set<CourseEntity> courses;

    public Set<CourseEntity> getCourses() {
        return courses;
    }

    public void setCourses(Set<CourseEntity> courses) {
        this.courses = courses;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStringID() {
        return stringID;
    }

    public void setStringID(String stringID) {
        this.stringID = stringID;
    }

    public int getModulePart_id() {
        return modulePart_id;
    }

    public void setModulePart_id(int modulePart_id) {
        this.modulePart_id = modulePart_id;
    }

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public int getEcts() {
        return ects;
    }

    public void setEcts(int ects) {
        this.ects = ects;
    }

    public String getSuccessControl() {
        return successControl;
    }

    public void setSuccessControl(String successControl) {
        this.successControl = successControl;
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

    public Set<ModuleEntity> getModules() {
        return modules;
    }

    public void setModules(Set<ModuleEntity> modules) {
        this.modules = modules;
    }

}
