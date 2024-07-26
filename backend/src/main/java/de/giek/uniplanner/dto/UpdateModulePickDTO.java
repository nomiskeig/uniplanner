package de.giek.uniplanner.dto;

public class UpdateModulePickDTO {
    private int moduleID;
    private int categoryID;
	private int semesterID;
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
	public int getSemesterID() {
		return semesterID;
	}
    public void setSemesterID(int semester) {
		this.semesterID = semester;
	}

}
