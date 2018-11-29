package com.nike.member;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.nike.action.ActionFoward;
import com.nike.page.MakePager;
import com.nike.page.Pager;
import com.nike.page.RowNumber;

public class MemberService {
	private MemberDAO memberDAO;

	public MemberService() {
		memberDAO = new MemberDAO();
	}

	public ActionFoward selectList(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		List<MemberDTO> ar = new ArrayList<>();

		int curPage = 1;
		try {
			curPage = Integer.parseInt(request.getParameter("curPage"));
		} catch (Exception e) {
		}
		String kind = request.getParameter("kind");
		String search = request.getParameter("search");
		MakePager makePager = new MakePager(curPage, kind, search);
		RowNumber rowNumber = makePager.makeRow();

		try {
			ar = memberDAO.seleteList(rowNumber);
			Pager pager = makePager.makePage(memberDAO.totalCount());
			request.setAttribute("curPage", curPage);
			request.setAttribute("list", ar);
			request.setAttribute("pager", pager);
			actionFoward.setCheck(true);
			actionFoward.setPath("../WEB-INF/view/member/memberList.jsp");
		} catch (Exception e) {
			e.printStackTrace();
			request.setAttribute("message", "fail");
			actionFoward.setCheck(true);
			actionFoward.setPath("../WEB-INF/view/common/result.jsp");
		}
		return actionFoward;
	}

	public ActionFoward join(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		int result = 0;
		String method = request.getMethod();
		HttpSession session = request.getSession();

		if (method.equals("POST")) {
			request.setAttribute("message", "fail");
			request.setAttribute("path", "./memberJoin.do");
			String sns = request.getParameter("sns");
			try {
				MemberDTO memberDTO = new MemberDTO();
				memberDTO.setId(request.getParameter("id"));
				memberDTO.setPassword(request.getParameter("pw2"));
				memberDTO.setName(request.getParameter("name"));
				memberDTO.setPhone(request.getParameter("phone"));
				if (sns != null) {
					if (sns.equals("kakao")) {
						memberDTO.setKakaoID(request.getParameter("snsid"));
					} else if (sns.equals("facebook")) {
						memberDTO.setFacebookID(request.getParameter("snsid"));
					}
				}

				result = memberDAO.insert(memberDTO);

				if (result > 0) {
					session.setAttribute("member", memberDTO);
					request.setAttribute("message", "success");
					request.setAttribute("path", "../index.jsp");
				}
			} catch (Exception e1) {
				e1.printStackTrace();
			}
			actionFoward.setPath("../WEB-INF/view/common/result.jsp");
		} else {
			actionFoward.setPath("../WEB-INF/view/member/memberJoin.jsp");
		}

		actionFoward.setCheck(true);
		return actionFoward;
	}

	public ActionFoward login(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		String method = request.getMethod();

		if (method.equals("POST")) {
			HttpSession session = request.getSession();
			String sns = request.getParameter("sns");
			MemberDTO memberDTO = new MemberDTO();
			memberDTO.setId(request.getParameter("id"));
			memberDTO.setPassword(request.getParameter("pw"));
			if (sns != null) {
				if (sns.equals("kakao")) {
					memberDTO.setKakaoID(request.getParameter("snsid"));
				} else if (sns.equals("facebook")) {
					memberDTO.setFacebookID(request.getParameter("snsid"));
				}
			}

			try {
				memberDTO = memberDAO.login(memberDTO);
				if (memberDTO.getJoin_date() != null) {
					if (sns != null) {
						memberDAO.snsLogin(memberDTO, sns);
					}
					session.setAttribute("member", memberDTO);
				} else {
					request.setAttribute("result", 1);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			actionFoward.setPath("../WEB-INF/view/member/memberCheckResult.jsp");
		} else {
			actionFoward.setPath("../WEB-INF/view/member/memberLogin.jsp");
		}

		actionFoward.setCheck(true);
		return actionFoward;
	}

	public ActionFoward selectOne(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();

		actionFoward.setCheck(true);
		actionFoward.setPath("../WEB-INF/view/member/memberSelectOne.jsp");
		return actionFoward;
	}

	public ActionFoward logout(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		HttpSession session = request.getSession();
		session.invalidate();
		
		Cookie [] cookies = request.getCookies();
		if(cookies != null){
		    for(int i=0; i < cookies.length; i++){
				Cookie cookie = new Cookie(cookies[i].getName(), null);
		             
		        // 쿠키의 유효시간을 0으로 설정하여 바로 만료시킨다.
		        cookie.setMaxAge(0);
		        // 응답에 쿠키 추가
		        response.addCookie(cookie);
		    }
		}

		request.setAttribute("message", "logout");
		request.setAttribute("path", "../index.jsp");
		actionFoward.setCheck(true);
		actionFoward.setPath("../WEB-INF/view/common/result.jsp");
		return actionFoward;
	}

	public ActionFoward delete(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		HttpSession session = request.getSession();
		request.setAttribute("message", "fail");
		request.setAttribute("path", "../index.jsp");

		try {
			int result = memberDAO.delete((MemberDTO) session.getAttribute("member"));
			if (result > 0) {
				session.invalidate();
				request.setAttribute("message", "seccess");
				request.setAttribute("path", "../index.jsp");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		actionFoward.setCheck(true);
		actionFoward.setPath("../WEB-INF/view/common/result.jsp");
		return actionFoward;
	}

	public ActionFoward update(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		HttpSession session = request.getSession();
		String method = request.getMethod();

		if (method.equals("POST")) {

			request.setAttribute("message", "fail");
			request.setAttribute("path", "./memberUpdate.do");
			try {
				MemberDTO memberDTO = (MemberDTO) session.getAttribute("member");
				memberDTO.setId(request.getParameter("id"));
				memberDTO.setPassword(request.getParameter("pw2"));
				memberDTO.setName(request.getParameter("firstName"));
				memberDTO.setPhone(request.getParameter("phone"));
				int result = memberDAO.update(memberDTO);
				if (result > 0) {
					session.setAttribute("member", memberDTO);
					request.setAttribute("message", "seccess");
					request.setAttribute("path", "./memberSelectOne.do");
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			actionFoward.setPath("../WEB-INF/view/common/result.jsp");
		} else {
			actionFoward.setPath("../WEB-INF/view/member/memberSelectOne.jsp");
		}
		actionFoward.setCheck(true);
		return actionFoward;
	}

	public ActionFoward checkId(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		String id = request.getParameter("id");
		try {
			int result = memberDAO.checkId(id);
			request.setAttribute("result", result);
		} catch (Exception e) {
			e.printStackTrace();
		}

		actionFoward.setCheck(true);
		actionFoward.setPath("../WEB-INF/view/member/memberCheckResult.jsp");
		return actionFoward;
	}

	public ActionFoward checkSns(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		String snsid = request.getParameter("snsid");
		String sns = request.getParameter("sns");

		try {
			int result = memberDAO.checkSns(snsid, sns);
			request.setAttribute("result", result);
		} catch (Exception e) {
			e.printStackTrace();
		}

		actionFoward.setCheck(true);
		actionFoward.setPath("../WEB-INF/view/member/memberCheckResult.jsp");
		return actionFoward;
	}
}
