package com.nike.board;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nike.action.ActionFoward;

public interface BoardService {
	public ActionFoward selectList(HttpServletRequest request, HttpServletResponse response);
	
	public ActionFoward selectOne(HttpServletRequest request, HttpServletResponse response);
	
	public ActionFoward insert(HttpServletRequest request, HttpServletResponse response);
	
	public ActionFoward update(HttpServletRequest request, HttpServletResponse response);
	
	public ActionFoward delete(HttpServletRequest request, HttpServletResponse response);

}
