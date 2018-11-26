package com.nike.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nike.action.ActionFoward;
import com.nike.product.ProductService;

/**
 * Servlet implementation class ProductController
 */
@WebServlet("/ProductController")
public class ProductController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private ProductService productService;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ProductController() {
		super();
		productService = new ProductService();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String command = request.getPathInfo();
		ActionFoward actionFoward = null;
		if (command.equals("/productList.do")) {

			actionFoward = productService.selectList(request, response);
		} else if (command.equals("/productSelectOne.do")) {
			actionFoward = productService.selectOne(request, response);
		} else if (command.equals("/productWrite.do")) {
			actionFoward = productService.insert(request, response);
		} else if (command.equals("/productDelete.do")) {
			actionFoward = productService.delete(request, response);
		} else if (command.equals("/productUpdate.do")) {
			actionFoward = productService.update(request, response);
		} else if (command.equals("/checkout.do")) {
			actionFoward = new ActionFoward();
			actionFoward.setCheck(true);
			actionFoward.setPath("../WEB-INF/view/product/checkout.jsp");
		} else if (command.equals("/checkout2.do")) {
			actionFoward = new ActionFoward();
			actionFoward.setCheck(true);
			actionFoward.setPath("../WEB-INF/view/product/checkout2.jsp");
		} else if (command.equals("/buy.do")) {
			actionFoward = new ActionFoward();
			actionFoward.setCheck(true);
			actionFoward.setPath("../WEB-INF/view/product/buy.jsp");
		}
		if (actionFoward.isCheck()) {
			RequestDispatcher view = request.getRequestDispatcher(actionFoward.getPath());
			view.forward(request, response);
		} else {
			response.sendRedirect(actionFoward.getPath());
		}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
