package com.nike.member;

import java.io.File;
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
			int max = 1024 * 1024 * 10;
			String save = request.getServletContext().getRealPath("upload");
			File file = new File(save);
			if (!file.exists()) {
				file.mkdirs();
			}
			MultipartRequest multi;
			try {
				multi = new MultipartRequest(request, save, max, "UTF-8", new DefaultFileRenamePolicy());

				MemberDTO memberDTO = new MemberDTO();
				memberDTO.setId(multi.getParameter("id"));
				memberDTO.setPassword(multi.getParameter("pw2"));
				memberDTO.setNickname(multi.getParameter("nickname"));
				memberDTO.setEmail(multi.getParameter("email"));
				memberDTO.setAddress(multi.getParameter("address"));
				memberDTO.setSex(multi.getParameter("sex"));
				memberDTO.setAge(Integer.parseInt(multi.getParameter("age")));
				memberDTO.setProfileFname(multi.getFilesystemName("f"));
				memberDTO.setProfileOname(multi.getOriginalFileName("f"));
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
			request.setAttribute("path", "./index.jsp");
			HttpSession session = request.getSession();
			MemberDTO memberDTO = new MemberDTO();
			memberDTO.setId(request.getParameter("id"));
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
}
