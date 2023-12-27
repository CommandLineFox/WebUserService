package raf.aleksabuncic.dto;

public class UserDto {
    private Integer userId;
    private String firstName;
    private String lastName;
    private String mail;
    private String password;

    private Integer readUserPermission;
    private Integer createUserPermission;
    private Integer updateUserPermission;
    private Integer deleteUserPermission;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getReadUserPermission() {
        return readUserPermission;
    }

    public void setReadUserPermission(int readUserPermission) {
        this.readUserPermission = readUserPermission;
    }

    public Integer getCreateUserPermission() {
        return createUserPermission;
    }

    public void setCreateUserPermission(int createUserPermission) {
        this.createUserPermission = createUserPermission;
    }

    public Integer getUpdateUserPermission() {
        return updateUserPermission;
    }

    public void setUpdateUserPermission(int updateUserPermission) {
        this.updateUserPermission = updateUserPermission;
    }

    public Integer getDeleteUserPermission() {
        return deleteUserPermission;
    }

    public void setDeleteUserPermission(int deleteUserPermission) {
        this.deleteUserPermission = deleteUserPermission;
    }
}
