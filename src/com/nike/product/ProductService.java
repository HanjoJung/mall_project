package com.nike.product;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nike.action.ActionFoward;

public class ProductService {
	
	private ProductDTO productDTO;
	
	public ProductService() {
		productDTO = new ProductDTO();
	}
	
	public ActionFoward selectList(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		
		return actionFoward;
	}

}
