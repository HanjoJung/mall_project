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
	private String snsid;

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

	public String getSnsid() {
		return snsid;
	}

	public void setSnsid(String snsid) {
		this.snsid = snsid;
	}

}
