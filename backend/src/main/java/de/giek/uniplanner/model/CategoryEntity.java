package de.giek.uniplanner.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "category")
public class CategoryEntity {
    @Id
    private int category_id;
    private String name;
    private int type;
    @Column(columnDefinition ="TEXT")
    private String info;
    private int studyCourse;
    private int minECTS;
    private int maxECTS;
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
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
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

}
