package de.giek.uniplanner.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="course")
public class CourseEntity {
    @Id
    private String course_id;
    private String semester;
	private String id;
	private String link;
    private String courseName;
    private String sws;
    private String type;
    private String responsible;
	@ManyToOne
    @JoinColumn(name = "modulePart", referencedColumnName = "modulePart_id")
    private ModulePartEntity modulePart;
	public String getCourse_id() {
		return course_id;
	}
    public void setCourse_id(String course_id) {
		this.course_id = course_id;
	}
    public String getCourseName() {
		return courseName;
	}
    public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	public String getSemester() {
		return semester;
	}
	public void setSemester(String semester) {
		this.semester = semester;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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


}
