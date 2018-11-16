package com.nike.qna;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.nike.action.ActionFoward;
import com.nike.board.BoardDTO;
import com.nike.board.BoardService;
import com.nike.member.MemberDTO;
import com.nike.notice.NoticeDTO;
import com.nike.page.MakePager;
import com.nike.page.Pager;
import com.nike.page.RowNumber;
import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;

public class QnaService implements BoardService{
	private QnaDAO qnaDao;
	
	public QnaService() {
		qnaDao=new QnaDAO();
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
		if(kind==null||kind=="") {
			kind = "title";
		}
		String search=request.getParameter("search");
		MakePager mk=new MakePager(curPage, search, kind);
		RowNumber rowNumber=mk.makeRow();
		List<BoardDTO> ar;
		try {
			ar=qnaDao.selectList(rowNumber);
			int totalCount=qnaDao.getCount(rowNumber.getSearch());
			Pager pager=mk.makePage(totalCount);
			request.setAttribute("list", ar);
			request.setAttribute("pager", pager);
			request.setAttribute("board", "qna");
			actionFoward.setPath("../WEB-INF/view/board/boardList.jsp");
		} catch (Exception e) {
			// TODO Auto-generated catch block
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
			boardDTO=qnaDao.selectOne(num);
			request.setAttribute("dto", boardDTO);
			request.setAttribute("board", "qna");
			actionFoward.setCheck(true);
			actionFoward.setPath("../WEB-INF/view/board/boardSelectOne.jsp");
		} catch (Exception e) {
			actionFoward.setCheck(false);
			actionFoward.setPath("./qnaList.do");
			e.printStackTrace();
		}
		if(boardDTO==null) {
			actionFoward.setCheck(false);
			actionFoward.setPath("./qnaList.do");
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
			String path="./qnaList.do";
			String save = request.getServletContext().getRealPath("upload");
			try {
				MultipartRequest multi=new MultipartRequest(request, save, "UTF-8");
				QnaDTO qnaDTO=new QnaDTO();
				qnaDTO.setTitle(multi.getParameter("title"));
				qnaDTO.setWriter(multi.getParameter("writer"));
				qnaDTO.setContents(multi.getParameter("contents"));
				qnaDTO.setNum(qnaDao.getNum());
				int result=qnaDao.insert(qnaDTO);
				if(result>0) {
					message="작성성공";
					actionFoward.setCheck(true);
					actionFoward.setPath("../WEB-INF/view/common/result.jsp");
				} else {
					actionFoward.setCheck(false);
					actionFoward.setPath("./qnaList.do");
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			request.setAttribute("message", message);
			request.setAttribute("path", path);
		}else {
			request.setAttribute("board", "qna");
			actionFoward.setCheck(true);
			if(session.getAttribute("member")==null) {
				request.setAttribute("message", "로그인을 하십시오");
				request.setAttribute("path", "./qnaList.do");
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
		String path = request.getServletContext().getRealPath("upload");
		if(method.equals("POST")) {
			try {
				QnaDTO qnaDTO=new QnaDTO();
				MultipartRequest multi = new MultipartRequest(request, path, "UTF-8");
				qnaDTO.setNum(Integer.parseInt(multi.getParameter("num")));
				qnaDTO.setTitle(multi.getParameter("title"));
				qnaDTO.setContents(multi.getParameter("contents"));
				int result = qnaDao.update(qnaDTO);
				if (result > 0) {
					request.setAttribute("message", "수정 성공");
					request.setAttribute("path", "./noticeList.do");
				}
			} catch (Exception e) {
				request.setAttribute("message", "수정 실패");
				request.setAttribute("path", "./qnaList.do");
				e.printStackTrace();
			}
			actionFoward.setCheck(true);
			actionFoward.setPath("../WEB-INF/view/common/result.jsp");
		} else {
			MemberDTO memberDTO=(MemberDTO) session.getAttribute("member");
			if(memberDTO!=null) {
				if(memberDTO.getName().equals(request.getParameter("writer"))) {
					int num=Integer.parseInt(request.getParameter("num"));
					try {
						BoardDTO boardDTO=qnaDao.selectOne(num);
						request.setAttribute("dto", boardDTO);
						request.setAttribute("board", "qna");
						actionFoward.setCheck(true);
						actionFoward.setPath("../WEB-INF/view/board/boardUpdate.jsp");
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
				} else {
					request.setAttribute("message", "작성자만 수정 할 수 있습니다");
					request.setAttribute("path", "./qnaList.do");
					actionFoward.setCheck(true);
					actionFoward.setPath("../WEB-INF/view/common/result.jsp");
					
				}
			} else {
				request.setAttribute("message", "로그인 해주시길 바랍니다");
				request.setAttribute("path", "./qnaList.do");
				actionFoward.setCheck(true);
				actionFoward.setPath("../WEB-INF/view/common/result.jsp");
			}
		}
	
		return actionFoward;
	}

	@Override
	public ActionFoward delete(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward=new ActionFoward();
		HttpSession session=request.getSession();
		MemberDTO memberDTO=(MemberDTO) session.getAttribute("member");
		if(memberDTO!=null) {
			try {
				int num=Integer.parseInt(request.getParameter("num"));
				BoardDTO boardDTO=qnaDao.selectOne(num);
				if(memberDTO.getId().equals(boardDTO.getWriter())) {
					num=qnaDao.delete(num);
					if(num>0) {
						request.setAttribute("message", "삭제 성공");
						request.setAttribute("path", "./qnaList.do");
					} else {
						request.setAttribute("message", "삭제 실패");
						request.setAttribute("path", "./qnaList.do");
					}
				}else {
					request.setAttribute("message", "작성자만 삭제할 수 있습니다");
					request.setAttribute("path", "./qnaList.do");
					actionFoward.setCheck(true);
					actionFoward.setPath("../WEB-INF/view/common/result.jsp");
				}
			} catch (Exception e) {
				request.setAttribute("message", "삭제 실패");
				request.setAttribute("path", "./qnaList.do");
				e.printStackTrace();
			}
			actionFoward.setCheck(true);
			actionFoward.setPath("../WEB-INF/view/common/result.jsp");
		} else {
			request.setAttribute("message", "로그인 해주시길 바랍니다");
			request.setAttribute("path", "./qnaList.do");
			actionFoward.setCheck(true);
			actionFoward.setPath("../WEB-INF/view/common/result.jsp");
		}
		return actionFoward;
	}

}
