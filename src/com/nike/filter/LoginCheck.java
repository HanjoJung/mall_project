package com.nike.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.nike.member.MemberDTO;

/**
 * Servlet Filter implementation class LoginCheck
 */
@WebFilter("/LoginCheck")
public class LoginCheck implements Filter {
	Map<String, String> map;

	/**
	 * Default constructor.
	 */
	public LoginCheck() {
		map = new HashMap<>();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		String command = ((HttpServletRequest) request).getPathInfo();
		String check = map.get(command);
		HttpSession session = ((HttpServletRequest) request).getSession();
		MemberDTO memberDTO = (MemberDTO) session.getAttribute("member");
		if (check != null) {
			if (memberDTO != null) {
				chain.doFilter(request, response);
			} else {
				request.setAttribute("message", "로그인을 하십시오");
				request.setAttribute("path", "../member/memberSnsLogin.do");
				RequestDispatcher view = request.getRequestDispatcher("../WEB-INF/view/common/result.jsp");
				view.forward(request, response);
			}
		} else {
			chain.doFilter(request, response);
		}
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		map.put("/memberSelectOne.do", "");
		map.put("/memberUpdate.do", "");
		map.put("/memberDelete.do", "");
		map.put("/noticeWrite.do", "");
		map.put("/noticeUpdate.do", "");
		map.put("/noticeDelete.do", "");
		map.put("/qnaWrite.do", "");
		map.put("/qnaUpdate.do", "");
		map.put("/qnaDelete.do", "");
		map.put("/reviewWrite.do", "");
	}

}
