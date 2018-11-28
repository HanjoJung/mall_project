package com.nike.basket;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.nike.action.ActionFoward;
import com.nike.file.FileDTO;
import com.nike.page.MakePager;
import com.nike.page.Pager;
import com.nike.page.RowNumber;
import com.nike.product.ProductDTO;

public class BasketService {

	private BasketDAO basketDAO;

	public BasketService() {
		basketDAO = new BasketDAO();
	}

	public ActionFoward insert(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		BasketDTO basketDTO = new BasketDTO();
		basketDTO.setId(request.getParameter("id"));
		basketDTO.setProductCode(request.getParameter("productCode"));
		basketDTO.setProductSize(Integer.parseInt(request.getParameter("productSize")));
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

	public ActionFoward selectList(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		String id = "";
		try {
			id = request.getParameter("id");
			List<BasketDTO> ar = basketDAO.selectList(id);
			BasketDTO basketDTO = new BasketDTO();
			request.setAttribute("bDTO", basketDTO);
			request.setAttribute("blist", ar);
			actionFoward.setPath("../WEB-INF/view/basket/cartlistall.jsp");
		} catch (Exception e) {
			request.setAttribute("message", "Basket Empty");
			actionFoward.setPath("../WEB-INF/common/result.jsp");
			e.printStackTrace();
		}
		
		actionFoward.setCheck(true);
		return actionFoward;
	}
	
	public ActionFoward basketList(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		String id = "";
		try {
			id = request.getParameter("id");
			List<BasketDTO> ar = basketDAO.selectList(id);
			BasketDTO basketDTO = new BasketDTO();
			request.setAttribute("bDTO", basketDTO);
			request.setAttribute("blist", ar);			
			actionFoward.setPath("../WEB-INF/view/basket/basketList.jsp");
		} catch (Exception e) {
			request.setAttribute("message", "Basket Empty");
			actionFoward.setPath("../WEB-INF/common/result.jsp");
			e.printStackTrace();
		}
		
		actionFoward.setCheck(true);
		return actionFoward;
	}
}