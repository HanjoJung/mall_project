package com.nike.product;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nike.action.ActionFoward;
import com.nike.page.MakePager;
import com.nike.page.Pager;
import com.nike.page.RowNumber;

public class ProductService {
	
	private ProductDAO productDAO;
	
	public ProductService() {
		productDAO = new ProductDAO();
	}
	
	public ActionFoward selectList(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		int curPage=1;
		try {
			curPage = Integer.parseInt(request.getParameter("curPage"));
		} catch (Exception e) {
			// TODO: handle exception
		}
		String kind = request.getParameter("kind");
		String search = request.getParameter("search");
		
		MakePager makePager = new MakePager(curPage, search, kind);
		RowNumber rowNumber = makePager.makeRow();
		
		try {
			List<ProductDTO> ar = productDAO.selectList(rowNumber);
			int totalCount = productDAO.getCount(rowNumber.getSearch());
			Pager pager = makePager.makePage(totalCount);
			
			request.setAttribute("list", ar);
			request.setAttribute("pager", pager);
			request.setAttribute("board", "product");
			actionFoward.setPath("../WEB-INF/view/board/boardList.jsp");
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			request.setAttribute("message", "Fail");
			request.setAttribute("path", "../index.jsp");
			actionFoward.setPath("../WEB-INF/common/result.jsp");
			e.printStackTrace();
		}
		actionFoward.setCheck(true);
		
		
		return actionFoward;
	}

}
