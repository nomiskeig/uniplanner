package de.giek.uniplanner.dto;

public class UserRegisterDTO {

    private String username;
    private String password;
    private int startingSemester;

    public int getStartingSemester() {
		return startingSemester;
	}

	public void setStartingSemester(int register) {
		this.startingSemester = register;
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
