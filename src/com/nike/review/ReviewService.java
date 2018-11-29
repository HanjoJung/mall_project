package com.nike.review;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.nike.action.ActionFoward;
import com.nike.board.BoardDTO;
import com.nike.member.MemberDTO;

public class ReviewService {
	private ReviewDAO reviewDAO;

	public ReviewService() {
		reviewDAO = new ReviewDAO();
	}

	public ActionFoward selectList(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		int Page = 1;
		try {
			Page = Integer.parseInt(request.getParameter("Page"));
		} catch (Exception e) {
		}
		String code = request.getParameter("code");
		int lastnum = Page * 2;

		try {
			List<ReviewDTO> ar = reviewDAO.selectList(code, lastnum);
			request.setAttribute("list", ar);
			request.setAttribute("count", lastnum);
			request.setAttribute("Page", Page);
			actionFoward.setPath("../WEB-INF/view/product/review.jsp");
		} catch (Exception e) {
			request.setAttribute("message", "fail");
			request.setAttribute("path", "../index.jsp");
			actionFoward.setPath("../WEB-INF/common/result.jsp");
			e.printStackTrace();
		}
		actionFoward.setCheck(true);
		return actionFoward;
	}

	public ActionFoward insert(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		request.setAttribute("message", "작성실패");

		try {
			ReviewDTO reviewDTO = new ReviewDTO();
			reviewDTO.setProductcode(request.getParameter("code"));
			reviewDTO.setTitle(request.getParameter("title"));
			reviewDTO.setWriter(request.getParameter("writer"));
			reviewDTO.setContents(request.getParameter("contents"));
			reviewDTO.setScore(Integer.parseInt(request.getParameter("score")));
			int result = reviewDAO.insert(reviewDTO);
			if (result > 0) {
				request.setAttribute("message", "작성성공");
				actionFoward.setCheck(true);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		actionFoward.setCheck(true);
		request.setAttribute("path", "../WEB-INF/view/product/review.jsp");
		actionFoward.setPath("../WEB-INF/view/common/result.jsp");
		return actionFoward;
	}

	public ActionFoward update(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		HttpSession session = request.getSession();
		request.setAttribute("message", "수정 실패");

		MemberDTO memberDTO = (MemberDTO) session.getAttribute("member");
		if (memberDTO != null) {
			if (memberDTO.getId().equals(request.getParameter("writer"))) {
				try {
					int num = Integer.parseInt(request.getParameter("num"));
					ReviewDTO reviewDTO = reviewDAO.selectOne(num);
					int result = reviewDAO.update(reviewDTO);
					if (result > 0) {
						request.setAttribute("message", "수정 성공");
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else {
				request.setAttribute("message", "작성자만 수정 할 수 있습니다");
			}
		} else {
			request.setAttribute("message", "로그인 해주시길 바랍니다");
		}
		actionFoward.setCheck(true);
		request.setAttribute("path", "../WEB-INF/view/product/review.jsp");
		actionFoward.setPath("../WEB-INF/view/common/result.jsp");
		return actionFoward;
	}

	public ActionFoward delete(HttpServletRequest request, HttpServletResponse response) {
		ActionFoward actionFoward = new ActionFoward();
		HttpSession session = request.getSession();

		MemberDTO memberDTO = (MemberDTO) session.getAttribute("member");
		request.setAttribute("message", "삭제 실패");
		int num = Integer.parseInt(request.getParameter("num"));
		try {
			BoardDTO boardDTO = reviewDAO.selectOne(num);
			if (memberDTO.getId().equals(boardDTO.getWriter())) {
				num = reviewDAO.delete(num);
				if (num > 0) {
					request.setAttribute("message", "삭제 성공");
				}
			} else {
				request.setAttribute("message", "작성자만 삭제할 수 있습니다");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		actionFoward.setCheck(true);
		request.setAttribute("path", "../WEB-INF/view/product/review.jsp");
		actionFoward.setPath("../WEB-INF/view/common/result.jsp");
		return actionFoward;
	}

}
