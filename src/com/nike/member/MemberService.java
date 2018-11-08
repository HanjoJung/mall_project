package com.nike.member;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nike.action.ActionFoward;
import com.nike.page.MakePager;
import com.nike.page.Pager;
import com.nike.page.Row;

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
		}catch (Exception e) {
		}
		String kind = request.getParameter("kind");
		String search = request.getParameter("search");
		MakePager makePager = new MakePager(curPage, kind, search);
		Row row = makePager.row();
				
		
		try {
			ar = memberDAO.seleteList(row);
			System.out.println(ar.size());
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

}
