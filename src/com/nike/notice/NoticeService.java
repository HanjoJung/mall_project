package com.nike.notice;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nike.action.ActionFoward;
import com.nike.board.BoardDTO;
import com.nike.board.BoardService;
import com.nike.page.MakePager;
import com.nike.page.Pager;
import com.nike.page.RowNumber;

public class NoticeService implements BoardService{
	private NoticeDAO noticeDAO;
	
	public NoticeService() {
		noticeDAO = new NoticeDAO();
	}

	@Override
	public ActionFoward selectList(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward=new ActionFoward();
		int curPage=1;
		curPage=Integer.parseInt(request.getParameter("curPage"));
		String kind=request.getParameter("kind");
		String search=request.getParameter("search");
		MakePager mk=new MakePager(curPage, search, kind);
		RowNumber rowNumber=mk.makeRow();
		
		try {
			List<BoardDTO> ar=noticeDAO.selectList(rowNumber);
			int totalCount=noticeDAO.getCount(rowNumber.getSearch());
			Pager pager=mk.makePage(totalCount);
			request.setAttribute("list", ar);
			request.setAttribute("pager", pager);
			request.setAttribute("board", "notice");
			actionFoward.setPath("../WEB-INF/view/board/boardList.jsp");
		} catch (Exception e) {
			request.setAttribute("message", "fail");
			request.setAttribute("path", "../index.jsp");
			actionFoward.setPath("../WEB-INF/common/result.jsp");
			e.printStackTrace();
		}
		
		actionFoward.setCheck(true);
		
		return actionFoward;
	}

	@Override
	public ActionFoward selectOne(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ActionFoward insert(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ActionFoward update(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ActionFoward delete(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		return null;
	}
	
	

}
