package de.giek.uniplanner.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "studyCourse")
public class StudyCourseEntity {
    @Id
    private int studyCourse_id;
    private String name;
	public int getStudyCourse_id() {
		return studyCourse_id;
	}
	public void setStudyCourse_id(int studyCourse_id) {
		this.studyCourse_id = studyCourse_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}



}
