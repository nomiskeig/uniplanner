package de.giek.uniplanner.dto;


public class UserPickDTO {
    private int moduleID;
    private int categoryID;
    private int semesterID;
	public int getSemesterID() {
		return semesterID;
	}
	public void setSemesterID(int semesterID) {
		this.semesterID = semesterID;
	}
	public int getModuleID() {
		return moduleID;
	}
	public void setModuleID(int moduleID) {
		this.moduleID = moduleID;
	}
	public int getCategoryID() {
		return categoryID;
	}
	public void setCategoryID(int categoryID) {
		this.categoryID = categoryID;
	}

}
