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
 * Servlet implementation class CSCenter
 */
@WebServlet("/CSCenter")
public class CSCenterController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public CSCenterController() {
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

		if (command.equals("/policy.do")) {
			actionFoward.setPath("../WEB-INF/view/cscenter/policy.jsp?kind=policy");
		} else if (command.equals("/guestPolicy.do")) {
			actionFoward.setPath("../WEB-INF/view/cscenter/policy.jsp?kind=guestPolicy");
		} else if (command.equals("/cscenter.do")) {
			actionFoward.setPath("../WEB-INF/view/cscenter/cscenter.jsp");
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
