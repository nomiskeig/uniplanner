package de.giek.uniplanner.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_id;

    private String username;
    private String password;
    private Integer selectedStudyCourse;
    @OneToOne(mappedBy = "user")
    private UserCategoryPickEntity userCategoryPick;

    @ManyToOne
    @JoinColumn(name="semester_id", nullable= false)
    private SemesterEntity startingSemester;


    public SemesterEntity getStartingSemester() {
		return startingSemester;
	}

	public void setStartingSemester(SemesterEntity startingSemester) {
		this.startingSemester = startingSemester;
	}

	public Integer getSelectedStudyCourse() {
        return selectedStudyCourse;
    }

    public void setSelectedStudyCourse(Integer selectedStudyCourse) {
        this.selectedStudyCourse = selectedStudyCourse;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer id) {
        this.user_id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
