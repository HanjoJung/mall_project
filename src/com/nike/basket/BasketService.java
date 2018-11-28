package com.nike.basket;

import java.util.List;

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
		try {
			String id = request.getParameter("id");
			String cookie = request.getParameter("cookie");

			if (id == null) {
				id = "";
			}
			if (cookie == null) {
				cookie = "";
			}
			List<BasketDTO> ar = basketDAO.selectList(id, cookie);
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
		try {
			String id = request.getParameter("id");
			String cookie = request.getParameter("cookie");
			if (id == null) {
				id = "";
			}
			if (cookie == null) {
				cookie = "";
			}
			List<BasketDTO> ar = basketDAO.selectList(id, cookie);
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