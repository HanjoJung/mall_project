package com.nike.member;

import java.io.File;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.nike.action.ActionFoward;
import com.nike.page.MakePager;
import com.nike.page.Pager;
import com.nike.page.RowNumber;
import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;

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

		if (method.equals("POST")) {
			request.setAttribute("message", "fail");
			request.setAttribute("path", "./memberJoin.do");

			try {
				MemberDTO memberDTO = new MemberDTO();
				memberDTO.setId(request.getParameter("id"));
				memberDTO.setPassword(request.getParameter("pw2"));
				memberDTO.setName(request.getParameter("name"));
				memberDTO.setPhone(request.getParameter("phone"));
//				memberDTO.setAddress(request.getParameter("address"));
//				memberDTO.setSex(request.getParameter("sex"));
//				memberDTO.setBirthday(Date.valueOf(request.getParameter("birthday")));
				result = memberDAO.insert(memberDTO);
				
				if (result > 0) {
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
			request.setAttribute("message", "fail");
			actionFoward.setPath("./memberLogin.do");
			HttpSession session = request.getSession();
			MemberDTO memberDTO = new MemberDTO();
			memberDTO.setId(request.getParameter("id"));
			System.out.println(request.getParameter("pw"));
			memberDTO.setPassword(request.getParameter("pw"));
			try {
				memberDTO = memberDAO.login(memberDTO);
				if (memberDTO.getJoin_date() != null) {
					session.setAttribute("member", memberDTO);
					request.setAttribute("message", "login");
					request.setAttribute("path", "../index.jsp");
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			actionFoward.setPath("../WEB-INF/view/common/result.jsp");
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
			int max = 1024 * 1024 * 10;
			String save = request.getServletContext().getRealPath("upload");
			File file = new File(save);
			if (!file.exists()) {
				file.mkdirs();
			}
			try {
				MultipartRequest multi;
				multi = new MultipartRequest(request, save, max, "UTF-8", new DefaultFileRenamePolicy());

				MemberDTO memberDTO = (MemberDTO) session.getAttribute("member");
				memberDTO.setId(multi.getParameter("id"));
				memberDTO.setPassword(multi.getParameter("pw2"));
				memberDTO.setName(multi.getParameter("name"));
				memberDTO.setPhone(multi.getParameter("phone"));
				memberDTO.setAddress(multi.getParameter("address"));
				memberDTO.setSex(multi.getParameter("sex"));
				memberDTO.setBirthday(Date.valueOf(multi.getParameter("birthday")));
				file = multi.getFile("f");
				if (file != null) {
					file = new File(save, memberDTO.getProfileFname());
					file.delete();
					memberDTO.setProfileFname(multi.getFilesystemName("f"));
					memberDTO.setProfileOname(multi.getOriginalFileName("f"));
				}
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
			actionFoward.setPath("../WEB-INF/view/member/memberUpdate.jsp");
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
		actionFoward.setPath("../WEB-INF/view/member/memberCheckId.jsp");
		return actionFoward;
	}
}
