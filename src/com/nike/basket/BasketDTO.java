package com.nike.basket;

import java.util.Random;

import com.nike.product.ProductDTO;

public class BasketDTO extends ProductDTO {
	private int num;
	private String id;
	private String fname;
	private String productSize;

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
		if (id == null) {
			id = "";
		}
		this.id = id;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getProductSize() {
		return productSize;
	}

	public void setProductSize(String productSize) {
		this.productSize = productSize;
	}

}