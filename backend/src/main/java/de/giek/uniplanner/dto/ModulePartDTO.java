package de.giek.uniplanner.dto;

import java.util.Set;
import java.util.stream.Collectors;

import de.giek.uniplanner.model.ModulePartEntity;

public class ModulePartDTO {
    private String stringID;
    private String kind;
    private int ects;
    private String successControl;
    private String recommendations;
    private String requirements;
    private String name;
    private Set<CourseDTO> courses;
    public ModulePartDTO(ModulePartEntity mpe) {
        this.stringID = mpe.getStringID();
        this.kind = mpe.getKind();
        this.ects = mpe.getEcts();
        this.successControl = mpe.getSuccessControl();
        this.requirements = mpe.getRequirements();
        this.recommendations = mpe.getRecommendations();
        this.name = mpe.getName();
        this.courses = mpe.getCourses().stream().map(c -> new CourseDTO(c)).collect(Collectors.toSet());
    }
	public Set<CourseDTO> getCourses() {
		return courses;
	}
	public void setCourses(Set<CourseDTO> courses) {
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
	public String getRecommendations() {
		return recommendations;
	}
	public void setRecommendations(String recommendations) {
		this.recommendations = recommendations;
	}
	public String getRequirements() {
		return requirements;
	}
	public void setRequirements(String requirements) {
		this.requirements = requirements;
	}
}

