package com.nike.basket;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.nike.action.ActionFoward;

public class BasketService {

	private BasketDAO basketDAO;

	public BasketService() {
		basketDAO = new BasketDAO();
	}

	public ActionFoward insert(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		BasketDTO basketDTO = new BasketDTO();
		basketDTO.setId(request.getParameter("id"));
		basketDTO.setproductCode(request.getParameter("productCode"));
		try {
			basketDAO.insert(basketDTO);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		actionFoward.setCheck(true);
		actionFoward.setPath("../WEB-INF/view/product/productSelectOne.jsp");
		return actionFoward;
	}
}