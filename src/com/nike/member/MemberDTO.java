package com.nike.member;

import java.sql.Date;

public class MemberDTO {
	private String id;
	private String password;
	private String nickname;
	private String email;
	private String phone;
	private String address;
	private String sex;
	private int age;
	private Date join_date;
	private String profileFname;
	private String profileOname;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public Date getJoin_date() {
		return join_date;
	}
	public void setJoin_date(Date join_date) {
		this.join_date = join_date;
	}
	public String getProfileFname() {
		return profileFname;
	}
	public void setProfileFname(String profileFname) {
		this.profileFname = profileFname;
	}
	public String getProfileOname() {
		return profileOname;
	}
	public void setProfileOname(String profileOname) {
		this.profileOname = profileOname;
	}

}
