package de.giek.uniplanner.dto;

import de.giek.uniplanner.model.SemesterEntity;

public class SemesterDTO {
    private int id;
    private String name;
    public SemesterDTO(SemesterEntity se) {
        this.id = se.getSemester_id();
        this.name = se.getName();
    }
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

}
