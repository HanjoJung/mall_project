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
		basketDTO.setProductSize(request.getParameter("productSize"));
		try {			
			basketDAO.insert(basketDTO);
			actionFoward.setPath("../WEB-INF/view/basket/basketAdd.jsp");
		} catch (Exception e) {
			e.printStackTrace();
		}		
		actionFoward.setCheck(true);
		return actionFoward;
	}

	public ActionFoward selectList(HttpServletRequest request, HttpServletResponse response) {
		/*HttpSession session = request.getSession();*/
		ActionFoward actionFoward = new ActionFoward();
		try {
			BasketDTO basketDTO = new BasketDTO();
			basketDTO.setId(request.getParameter("id"));
			/*basketDTO.setCookie(session.getAttribute("basket").toString());*/

			List<BasketDTO> ar = basketDAO.selectList(basketDTO);
			request.setAttribute("blist", ar);
			actionFoward.setPath("../WEB-INF/view/basket/cartlistall.jsp");
			/*System.out.println(basketDTO);
			System.out.println(ar);*/
		} catch (Exception e) {
			request.setAttribute("message", "Basket Empty");
			actionFoward.setPath("../WEB-INF/common/result.jsp");
			e.printStackTrace();
		}

		actionFoward.setCheck(true);
		return actionFoward;
	}
	
	public ActionFoward minicartList(HttpServletRequest request, HttpServletResponse response) {
		/*HttpSession session = request.getSession();*/
		ActionFoward actionFoward = new ActionFoward();
		try {
			BasketDTO basketDTO = new BasketDTO();
			basketDTO.setId(request.getParameter("id"));
			/*basketDTO.setCookie(session.getAttribute("basket").toString());*/

			List<BasketDTO> ar = basketDAO.selectList(basketDTO);
			request.setAttribute("blist", ar);
			actionFoward.setPath("../minicart.jsp");
			/*System.out.println(basketDTO);
			System.out.println(ar);*/
		} catch (Exception e) {
			request.setAttribute("message", "Basket Empty");
			actionFoward.setPath("../WEB-INF/common/result.jsp");
			e.printStackTrace();
		}

		actionFoward.setCheck(true);
		return actionFoward;
	}

	public ActionFoward basketList(HttpServletRequest request, HttpServletResponse response) {
		/*HttpSession session = request.getSession();*/
		ActionFoward actionFoward = new ActionFoward();
		try {
			BasketDTO basketDTO = new BasketDTO();
			basketDTO.setId(request.getParameter("id"));
			/*basketDTO.setCookie(session.getAttribute("basket").toString());*/
			
			List<BasketDTO> ar = basketDAO.selectList(basketDTO);
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
		/*HttpSession session = request.getSession();*/
		int num = Integer.parseInt(request.getParameter("num"));
		BasketDTO basketDTO = new BasketDTO();
		basketDTO.setId(request.getParameter("id"));
		try {
			basketDAO.delete(num);
			List<BasketDTO> ar = basketDAO.selectList(basketDTO);			
			request.setAttribute("blist", ar);
			actionFoward.setPath("../WEB-INF/view/basket/cartlistall.jsp");
		} catch (Exception e) {
			e.printStackTrace();
		}
		actionFoward.setCheck(true);
		return actionFoward;
	}
	
	public ActionFoward basketDeleteall(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();		
		/*HttpSession session = request.getSession();*/		
		BasketDTO basketDTO = new BasketDTO();
		basketDTO.setId(request.getParameter("id"));
		try {
			basketDAO.deleteall(basketDTO.getId());
			List<BasketDTO> ar = basketDAO.selectList(basketDTO);			
			request.setAttribute("blist", ar);
			actionFoward.setPath("../WEB-INF/view/basket/cartlistall.jsp");
		} catch (Exception e) {
			e.printStackTrace();
		}
		actionFoward.setCheck(true);
		return actionFoward;
	}
}