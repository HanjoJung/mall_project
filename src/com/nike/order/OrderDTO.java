package com.nike.order;

public class OrderDTO {
	private int ordernum;
	private String productcode;
	private int produntsize;
	private String color;
	private String deliveryname;
	private String deliverystart;
	private String deliverycurrent;
	public int getOrdernum() {
		return ordernum;
	}
	public void setOrdernum(int ordernum) {
		this.ordernum = ordernum;
	}
	public String getProductcode() {
		return productcode;
	}
	public void setProductcode(String productcode) {
		this.productcode = productcode;
	}
	public int getProduntsize() {
		return produntsize;
	}
	public void setProduntsize(int produntsize) {
		this.produntsize = produntsize;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getDeliveryname() {
		return deliveryname;
	}
	public void setDeliveryname(String deliveryname) {
		this.deliveryname = deliveryname;
	}
	public String getDeliverystart() {
		return deliverystart;
	}
	public void setDeliverystart(String deliverystart) {
		this.deliverystart = deliverystart;
	}
	public String getDeliverycurrent() {
		return deliverycurrent;
	}
	public void setDeliverycurrent(String deliverycurrent) {
		this.deliverycurrent = deliverycurrent;
	}

}
