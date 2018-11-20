package com.nike.member;

import java.sql.Date;

public class MemberDTO {
	private String id;
	private String password;
	private String name;
	private String phone;
	private String address;
	private String sex;
	private Date birthday;
	private Date join_date;
	private String profileFname;
	private String profileOname;
	private String kakaoID;
	private String facebookID;

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
		if (this.password == null) {
			this.password = "";
		}
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
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

	public String getKakaoID() {
		return kakaoID;
	}

	public void setKakaoID(String kakaoID) {
		this.kakaoID = kakaoID;
		if (this.kakaoID == null) {
			this.kakaoID = "";
		}
	}

	public String getFacebookID() {
		return facebookID;
	}

	public void setFacebookID(String facebookID) {
		this.facebookID = facebookID;
		if (this.facebookID == null) {
			this.facebookID = "";
		}
	}
}
