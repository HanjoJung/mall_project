package com.nike.basket;

import java.util.Random;

import com.nike.product.ProductDTO;

public class BasketDTO extends ProductDTO {

	private int num;
	private String id;
	private String cookie;
	private String fname;
	private int productSize;
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		if(id == null) {
			id = "";
		}
		this.id = id;
	}
	public String getCookie() {
		return cookie;
	}
	public void setCookie(String cookie) {
		if(cookie == null) {
			String str = "";
			Random ran = new Random(System.currentTimeMillis());
			for (int i = 0; i < 10; i++) {
				char c = (char)(ran.nextInt(78)+48);
				 str += c; 
			}
			cookie = str;
		}
		this.cookie = cookie;
	}
	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public int getProductSize() {
		return productSize;
	}
	public void setProductSize(int productSize) {
		this.productSize = productSize;
	}
}