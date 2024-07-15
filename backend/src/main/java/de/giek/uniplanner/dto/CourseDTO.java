package de.giek.uniplanner.dto;

import de.giek.uniplanner.model.CourseEntity;

public class CourseDTO {
    private String semester;
    private String link;
	private String sws;
	private String type;
	private String responsible;
	private String name;
	public CourseDTO(CourseEntity ce) {
        this.semester = ce.getSemester();
        this.link = ce.getLink();
        this.sws = ce.getSws();
        this.type = ce.getType();
        this.responsible = ce.getResponsible();
        this.name = ce.getCourseName();
    }
	public String getSemester() {
		return semester;
	}
	public void setSemester(String semester) {
		this.semester = semester;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	public String getSws() {
		return sws;
	}
	public void setSws(String sws) {
		this.sws = sws;
	}
	public String getType() {
		return type;
	}
    public void setType(String type) {
		this.type = type;
	}
    public String getResponsible() {
		return responsible;
	}
    public void setResponsible(String responsible) {
		this.responsible = responsible;
	}
    public String getName() {
		return name;
	}
    public void setName(String courseName) {
		this.name = courseName;
	}

}
