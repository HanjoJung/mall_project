package com.nike.notice;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.nike.notice.NoticeDTO;
import com.nike.action.ActionFoward;
import com.nike.board.BoardDTO;
import com.nike.board.BoardService;
import com.nike.member.MemberDTO;
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
		try {
			curPage=Integer.parseInt(request.getParameter("curPage"));
		} catch (Exception e) {
			// TODO: handle exception
		}
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
		ActionFoward actionFoward = new ActionFoward();
		BoardDTO boardDTO=null;
		try {
			int num=Integer.parseInt(request.getParameter("num"));
			boardDTO=noticeDAO.selectOne(num);
			request.setAttribute("dto", boardDTO);
			request.setAttribute("board", "notice");
			actionFoward.setCheck(true);
			actionFoward.setPath("../WEB-INF/view/board/boardSelectOne.jsp");			
		} catch (Exception e) {
			actionFoward.setCheck(false);
			actionFoward.setPath("./noticeList.do");
		}
		if(boardDTO==null) {
			actionFoward.setCheck(false);
			actionFoward.setPath("./noticeList.do");
		}
		
		return actionFoward;
	}

	@Override
	public ActionFoward insert(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward=new ActionFoward();
		HttpSession session=request.getSession();
		
		String method=request.getMethod();
		if(method.equals("POST")) {
			String message="작성실패";
			String path="./noticeList.do";
			NoticeDTO noticeDTO = new NoticeDTO();
			try {
				noticeDTO.setNum(noticeDAO.getNum());
				int result = noticeDAO.insert(noticeDTO);
				if (result > 0) {
					message = "작성 성공";
					actionFoward.setCheck(true);
					actionFoward.setPath("../WEB-INF/view/common/result.jsp");
				} else {
					actionFoward.setCheck(false);
					actionFoward.setPath("./noticeList.do");
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			request.setAttribute("message", message);
			request.setAttribute("path", path);
		}else {
			request.setAttribute("board", "notice");
			actionFoward.setCheck(true);
			if (session.getAttribute("member") == null) {
				request.setAttribute("message", "관리자만 작성가능합니다");
				request.setAttribute("path", "./noticeList.do");
				actionFoward.setPath("../WEB-INF/view/common/result.jsp");
			} else {
				actionFoward.setPath("../WEB-INF/view/board/boardWrite.jsp");
			}
		}
		return actionFoward;
		
		
	}

	@Override
	public ActionFoward update(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		String method = request.getMethod();
		HttpSession session = request.getSession();

		if (method.equals("POST")) {
			try {
				NoticeDTO noticeDTO = new NoticeDTO();
				int result = noticeDAO.update(noticeDTO);
				if (result > 0) {
					request.setAttribute("message", "Update Success");
					request.setAttribute("path", "./noticeList.do");
				} else {
					// update fail
					request.setAttribute("message", "Update Fail");
					request.setAttribute("path", "./noticeList.do");
				}

			} catch (Exception e) {
				request.setAttribute("message", "Update Fail");
				request.setAttribute("path", "./noticeList.do");
				e.printStackTrace();
			}

			actionFoward.setCheck(true);
			actionFoward.setPath("../WEB-INF/view/common/result.jsp");

		} else {
			// Form
			MemberDTO memberDTO = (MemberDTO) session.getAttribute("member");
			if (memberDTO != null) {
				if (memberDTO.getId().equals(request.getParameter("writer"))) {
					try {
						int num = Integer.parseInt(request.getParameter("num"));
						BoardDTO boardDTO = noticeDAO.selectOne(num);
						request.setAttribute("dto", boardDTO);
						request.setAttribute("board", "notice");
						actionFoward.setCheck(true);
						actionFoward.setPath("../WEB-INF/view/board/boardUpdate.jsp");
					} catch (Exception e) {
					}
				} else {
					request.setAttribute("message", "작성자만 수정할 수 있습니다");
					request.setAttribute("path", "./noticeList.do");
					actionFoward.setCheck(true);
					actionFoward.setPath("../WEB-INF/view/common/result.jsp");
				}
			} else {
				request.setAttribute("message", "로그인 해주시길 바랍니다");
				request.setAttribute("path", "./noticeList.do");
				actionFoward.setCheck(true);
				actionFoward.setPath("../WEB-INF/view/common/result.jsp");
			}
		}
		return actionFoward;
	}

	@Override
	public ActionFoward delete(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		HttpSession session = request.getSession();

		MemberDTO memberDTO = (MemberDTO) session.getAttribute("member");
		if (memberDTO != null) {
			int num = Integer.parseInt(request.getParameter("num"));
			try {
				BoardDTO noticeDTO = noticeDAO.selectOne(num);
				if (memberDTO.getId().equals(noticeDTO.getWriter())) {
					num = noticeDAO.delete(num);

					if (num > 0) {
						request.setAttribute("message", "삭제 성공");
						request.setAttribute("path", "./noticeList.do");
					} else {
						request.setAttribute("message", "삭제 실패");
						request.setAttribute("path", "./noticeList.do");
					}
				} else {
					request.setAttribute("message", "작성자만 삭제할 수 있습니다");
					request.setAttribute("path", "./noticeList.do");
					actionFoward.setCheck(true);
					actionFoward.setPath("../WEB-INF/view/common/result.jsp");
				}
			} catch (Exception e) {
				request.setAttribute("message", "삭제 실패");
				request.setAttribute("path", "./noticeList.do");
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
