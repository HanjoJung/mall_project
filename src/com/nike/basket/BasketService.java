package com.nike.basket;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
		basketDTO.setProductCode(request.getParameter("productCode"));
		basketDTO.setProductSize(request.getParameter("productSize"));
		basketDTO.setCookie(request.getParameter("cookie"));
		try {
			basketDAO.insert(basketDTO);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		actionFoward.setCheck(true);
		actionFoward.setPath("/mall_project/basketList.jsp");
		return actionFoward;
	}

	public ActionFoward selectList(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		String id = "";
		String cookie = "";

		try {
			id = request.getParameter("id");
			cookie = request.getParameter("cookie");
			List<BasketDTO> ar = basketDAO.selectList(id, cookie);
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
		String cookie = "";

		try {
			id = request.getParameter("id");
			cookie = request.getParameter("cookie");
			List<BasketDTO> ar = basketDAO.selectList(id, cookie);
			request.setAttribute("blist", ar);
			actionFoward.setPath("../WEB-INF/view/product/checkout.jsp");
		} catch (Exception e) {
			request.setAttribute("message", "Basket Empty");
			actionFoward.setPath("../WEB-INF/common/result.jsp");
			e.printStackTrace();
		}

		actionFoward.setCheck(true);
		return actionFoward;
	}

	public ActionFoward basketDelete(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();		
		int num = Integer.parseInt(request.getParameter("num"));
		String id = request.getParameter("id");
		String cookie = request.getParameter("cookie");
		try {
			num = basketDAO.delete(num);
			List<BasketDTO> ar = basketDAO.selectList(id, cookie);			
			request.setAttribute("blist", ar);
			actionFoward.setPath("../WEB-INF/view/basket/cartlistall.jsp");
		} catch (Exception e) {
			e.printStackTrace();
		}
		actionFoward.setCheck(true);
		return actionFoward;
	}
}