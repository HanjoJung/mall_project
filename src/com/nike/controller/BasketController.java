package com.nike.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nike.action.ActionFoward;
import com.nike.basket.BasketService;

/**
 * Servlet implementation class BasketConroller
 */
@WebServlet("/BasketConroller")
public class BasketController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private BasketService basketService;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public BasketController() {
		super();
		basketService = new BasketService();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		/* HttpSession session = request.getSession(); */
		String command = request.getPathInfo();
		ActionFoward actionFoward = null;

		/*
		 * Cookie[] cookies = request.getCookies(); for (Cookie cookie : cookies) { if
		 * (cookie.getName().equals("basket")) { session.setAttribute("cookie",
		 * cookie.getValue()); } }
		 */
		if (command.equals("/basketAdd.do")) {
			actionFoward = basketService.insert(request, response);
		} else if (command.equals("/selectList.do")) {
			actionFoward = basketService.selectList(request, response);
		} else if (command.equals("/basketList.do")) {
			actionFoward = basketService.basketList(request, response);
		} else if (command.equals("/basketDelete.do")) {
			actionFoward = basketService.basketDelete(request, response);
		} else if (command.equals("/basketDeleteall.do")) {
			actionFoward = basketService.basketDeleteall(request, response);
		} else if (command.equals("/minicart.do")) {
			actionFoward = basketService.minicartList(request, response);
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
