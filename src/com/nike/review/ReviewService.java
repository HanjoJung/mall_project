package com.nike.review;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nike.action.ActionFoward;
import com.nike.board.BoardDTO;
import com.nike.board.BoardService;
import com.nike.notice.NoticeDAO;
import com.nike.page.MakePager;
import com.nike.page.Pager;
import com.nike.page.RowNumber;

public class ReviewService implements BoardService{
	private ReviewDAO reviewDAO;
	
	public ReviewService() {
		reviewDAO=new ReviewDAO();
	}

	@Override
	public ActionFoward selectList(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward=new ActionFoward();
		int curPage=1;
		try {
			curPage=Integer.parseInt(request.getParameter("num"));		
		} catch (Exception e) {
			// TODO: handle exception
		}
		String kind=request.getParameter("kind");
		String search=request.getParameter("search");
		MakePager mk=new MakePager(curPage, search, kind);
		RowNumber rowNumber=mk.makeRow();
		
		try {
			List<BoardDTO> ar=reviewDAO.selectList(rowNumber);
			int totalCount=reviewDAO.getCount(rowNumber.getSearch());
			Pager pager=mk.makePage(totalCount);
			request.setAttribute("list", ar);
			request.setAttribute("pager", pager);
			request.setAttribute("board", "review");
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
		ActionFoward actionFoward=new ActionFoward();
		BoardDTO boardDTO=null;
		try {
			int num=Integer.parseInt(request.getParameter("num"));
			boardDTO=reviewDAO.selectOne(num);
			request.setAttribute("dto", boardDTO);
			request.setAttribute("board", "review");
			actionFoward.setCheck(true);
			actionFoward.setPath("../WEB-INF/view/board/boardSelectOne.jsp");
		} catch (Exception e) {
			actionFoward.setCheck(false);
			actionFoward.setPath("./reviewList.do");
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public ActionFoward insert(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward=new ActionFoward();
		return null;
	}

	@Override
	public ActionFoward update(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward=new ActionFoward();
		return null;
	}

	@Override
	public ActionFoward delete(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward=new ActionFoward();
		return null;
	}

}
