package com.nike.review;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.nike.action.ActionFoward;
import com.nike.board.BoardDTO;
import com.nike.board.BoardService;
import com.nike.member.MemberDTO;
import com.nike.notice.NoticeDAO;
import com.nike.page.MakePager;
import com.nike.page.Pager;
import com.nike.page.RowNumber;
import com.nike.qna.QnaDTO;
import com.oreilly.servlet.MultipartRequest;

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
		if(kind==null||kind=="") {
			kind = "title";
		}
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
		HttpSession session=request.getSession();
		String method=request.getMethod();
		
		if(method.equals("POST")) {
			String message="작성실패";
			String path="./reviewList.do";
			String save = request.getServletContext().getRealPath("upload");
			try {
				MultipartRequest multi=new MultipartRequest(request, save, "UTF-8");
				ReviewDTO reviewDTO=new ReviewDTO();
				reviewDTO.setTitle(multi.getParameter("title"));
				reviewDTO.setWriter(multi.getParameter("writer"));
				reviewDTO.setContents(multi.getParameter("contents"));
				reviewDTO.setNum(reviewDAO.getNum());
				int result=reviewDAO.insert(reviewDTO);
				if(result>0) {
					message="작성성공";
					actionFoward.setCheck(true);
					actionFoward.setPath("../WEB-INF/view/common/result.jsp");
				} else {
					actionFoward.setCheck(false);
					actionFoward.setPath("./reviewList.do");
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			request.setAttribute("message", message);
			request.setAttribute("path", path);
		}else {
			request.setAttribute("board", "review");
			actionFoward.setCheck(true);
			if(session.getAttribute("member")==null) {
				request.setAttribute("message", "로그인을 하십시오");
				request.setAttribute("path", "./reviewList.do");
				actionFoward.setPath("../WEB-INF/view/common/result.jsp");
			}else {
				actionFoward.setPath("../WEB-INF/view/board/boardWrite.jsp");
			}
		}
		return actionFoward;
	}

	@Override
	public ActionFoward update(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward=new ActionFoward();
		HttpSession session=request.getSession();
		String method=request.getMethod();
		
		if(method.equals("POST")) {
			try {
				ReviewDTO reviewDTO=new ReviewDTO();
				int result=reviewDAO.update(reviewDTO);
				if(result>0) {
					request.setAttribute("message", "수정 성공");
					request.setAttribute("path", "./reviewList.do");
				}else {
					request.setAttribute("message", "수정 실패");
					request.setAttribute("path", "./reviewList.do");
				}
			} catch (Exception e) {
				request.setAttribute("message", "수정 실패");
				request.setAttribute("path", "./reviewList.do");
				e.printStackTrace();
			}
			actionFoward.setCheck(true);
			actionFoward.setPath("../WEB-INF/view/common/result.jsp");
		} else {
			MemberDTO memberDTO=(MemberDTO) session.getAttribute("member");
			if(memberDTO!=null) {
				if(memberDTO.getId().equals(request.getParameter("writer"))) {
					try {
						int num=Integer.parseInt(request.getParameter("num"));
						BoardDTO boardDTO=reviewDAO.selectOne(num);
						request.setAttribute("dto", boardDTO);
						request.setAttribute("board", "review");
						actionFoward.setCheck(true);
						actionFoward.setPath("../WEB-INF/view/board/boardUpdate.jsp");
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
				} else {
					request.setAttribute("message", "작성자만 수정 할 수 있습니다");
					request.setAttribute("path", "./reviewList.do");
					actionFoward.setCheck(true);
					actionFoward.setPath("../WEB-INF/view/common/result.jsp");
					
				}
			} else {
				request.setAttribute("message", "로그인 해주시길 바랍니다");
				request.setAttribute("path", "./reviewList.do");
				actionFoward.setCheck(true);
				actionFoward.setPath("../WEB-INF/view/common/result.jsp");
			}
		}
		return actionFoward;
	}

	@Override
	public ActionFoward delete(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward=new ActionFoward();
		HttpSession session = request.getSession();

		MemberDTO memberDTO = (MemberDTO) session.getAttribute("member");
		if (memberDTO != null) {
			int num = Integer.parseInt(request.getParameter("num"));
			try {
				BoardDTO boardDTO = reviewDAO.selectOne(num);
				if (memberDTO.getId().equals(boardDTO.getWriter())) {
					num = reviewDAO.delete(num);

					if (num > 0) {
						request.setAttribute("message", "삭제 성공");
						request.setAttribute("path", "./reviewList.do");
					} else {
						request.setAttribute("message", "삭제 실패");
						request.setAttribute("path", "./reviewList.do");
					}
				} else {
					request.setAttribute("message", "작성자만 삭제할 수 있습니다");
					request.setAttribute("path", "./reviewList.do");
					actionFoward.setCheck(true);
					actionFoward.setPath("../WEB-INF/view/common/result.jsp");
				}
			} catch (Exception e) {
				request.setAttribute("message", "삭제 실패");
				request.setAttribute("path", "./reviewList.do");
				e.printStackTrace();
			}
			actionFoward.setCheck(true);
			actionFoward.setPath("../WEB-INF/view/common/result.jsp");
		} else {
			request.setAttribute("message", "로그인 해주시길 바랍니다");
			request.setAttribute("path", "./noticeList.do");
			actionFoward.setCheck(true);
			actionFoward.setPath("../WEB-INF/view/common/result.jsp");
		}
		return actionFoward;
	}

}
