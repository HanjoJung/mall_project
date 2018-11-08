package com.nike.member;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
			request.setAttribute("message", "file");
			actionFoward.setCheck(true);
			actionFoward.setPath("../WEB-INF/view/common/result.jsp");
		}
		return actionFoward;
	}

	public ActionFoward join(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		int result = 0;
		String method = request.getMethod();

		if (method == "POST") {
			int max = 1024 * 1024 * 10;
			String save = request.getServletContext().getRealPath("photo");
			File file = new File(save);
			if (!file.exists()) {
				file.mkdirs();
			}
			try {

				MemberDTO memberDTO = new MemberDTO();
				result = memberDAO.insert(memberDTO);

			} catch (Exception e1) {
				e1.printStackTrace(); 
			}

			actionFoward.setCheck(true);
			actionFoward.setPath("../WEB-INF/view/common/result.jsp");
		} else {

		}
		return actionFoward;
	}

}
