package com.nike.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nike.action.ActionFoward;

/**
 * Servlet implementation class AjaxController
 */
@WebServlet("/AjaxController")
public class AjaxController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AjaxController() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String command = request.getPathInfo();
		ActionFoward actionFoward = new ActionFoward();
		if (command.equals("/kakaoLogin.do")) {
			actionFoward.setPath("../WEB-INF/view/member/kakaoLogin.jsp");
		} else if (command.equals("/facebookLogin.do")) {
			actionFoward.setPath("../WEB-INF/view/member/facebookLogin.jsp");
		} else if (command.equals("/memberCheckId.do")) {
			actionFoward.setPath("../member/memberCheckId.do");
		} else if (command.equals("/memberCheckSns.do")) {
			actionFoward.setPath("../member/memberCheckSns.do");
		} else if (command.equals("/memberJoin.do")) {
			actionFoward.setPath("../member/memberJoin.do");
		} else if (command.equals("/memberLogin.do")) {
			actionFoward.setPath("../member/memberLogin.do");
		} else if (command.equals("/snsLogin.do")) {
			actionFoward.setPath("../WEB-INF/view/member/snsLogin.jsp");
		}
		RequestDispatcher view = request.getRequestDispatcher(actionFoward.getPath());
		view.forward(request, response);
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
