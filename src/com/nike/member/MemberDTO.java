package com.nike.member;

import java.sql.Date;

public class MemberDTO {
	private String id;
	private String password;
	private String name;
	private String phone;
	private String address;
	private Date join_date;
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

	public Date getJoin_date() {
		return join_date;
	}

	public void setJoin_date(Date join_date) {
		this.join_date = join_date;
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
