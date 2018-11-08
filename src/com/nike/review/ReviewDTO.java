package com.nike.review;

import com.nike.board.BoardDTO;

public class ReviewDTO extends BoardDTO{
	private String productcode;
	private int score;
	public String getProductcode() {
		return productcode;
	}
	public void setProductcode(String productcode) {
		this.productcode = productcode;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}

}
