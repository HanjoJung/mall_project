package com.nike.qna;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.nike.board.BoardDAO;
import com.nike.board.BoardDTO;
import com.nike.board.BoardReply;
import com.nike.board.BoardReplyDTO;
import com.nike.page.RowNumber;
import com.nike.page.Search;
import com.nike.util.DBconnector;

public class QnaDAO implements BoardDAO, BoardReply {

	@Override
	public int reply(BoardReplyDTO boardReplyDTO) throws Exception {
		Connection con=DBconnector.getConnect();
		String sql="insert into qna values(?,?,?,?,sysdate,0,?,?,?)";
		PreparedStatement st=con.prepareStatement(sql);
		
		int result=st.executeUpdate();
		st.setInt(1, boardReplyDTO.getNum());
		st.setString(2, boardReplyDTO.getTitle());
		st.setString(3, boardReplyDTO.getContents());
		st.setString(4, boardReplyDTO.getWriter());
		st.setInt(5, boardReplyDTO.getRef());
		st.setInt(6, boardReplyDTO.getStep()+1);
		st.setInt(7, boardReplyDTO.getDepth()+1);
		
		DBconnector.disConnect(st, con);
		
		return result;
	}

	@Override
	public int replyUpdate(BoardReplyDTO boardReplyDTO) throws Exception {
		Connection con=DBconnector.getConnect();
		String sql="update qna set step=step+1 where ref=? and step>?";
		
		PreparedStatement st=con.prepareStatement(sql);
		int result=st.executeUpdate();
		
		DBconnector.disConnect(st, con);
		return result;
	}

	@Override
	public List<BoardDTO> selectList(RowNumber rowNumber) throws Exception {
		Connection con=DBconnector.getConnect();
		String sql="select * from qna";
		
		PreparedStatement st=con.prepareStatement(sql);
		
		ResultSet rs=st.executeQuery();
		List<BoardDTO> ar=new ArrayList<>();
		QnaDTO qnaDTO=null;
		while(rs.next()) {
			qnaDTO=new QnaDTO();
			qnaDTO.setNum(rs.getInt("num"));
			qnaDTO.setTitle(rs.getString("title"));
			qnaDTO.setWriter(rs.getString("writer"));
			qnaDTO.setReg_date(rs.getDate("reg_date"));
			qnaDTO.setHit(rs.getInt("hit"));
			qnaDTO.setDepth(rs.getInt("depth"));
		}
		
		DBconnector.disConnect(rs, st, con);
		
		return ar;
	}

	@Override
	public BoardDTO selectOne(int num) throws Exception {
		Connection con=DBconnector.getConnect();
		String sql="select * from qna where num=?";
		PreparedStatement st=con.prepareStatement(sql);
		st.setInt(1, num);
		QnaDTO qnaDTO=null;
		ResultSet rs=st.executeQuery();
		
		if(rs.next()) {
			qnaDTO=new QnaDTO();
			qnaDTO.setNum(rs.getInt("num"));
			qnaDTO.setTitle(rs.getString("title"));
			qnaDTO.setContents(rs.getString("contents"));
			qnaDTO.setWriter(rs.getString("writer"));
			qnaDTO.setReg_date(rs.getDate("reg_date"));
			qnaDTO.setHit(rs.getInt("hit"));
		}
		DBconnector.disConnect(rs, st, con);
		return qnaDTO;
	}

	@Override
	public int insert(BoardDTO boardDTO) throws Exception {
		Connection con=DBconnector.getConnect();
		String sql="insert into qna values(qna_seq.nextval,?,?,?,sysdate,0,qna_seq.currval,0,0)";
		PreparedStatement st=con.prepareStatement(sql);
		
		st.setString(1, boardDTO.getTitle());
		st.setString(2, boardDTO.getContents());
		st.setString(3, boardDTO.getWriter());
		int result=st.executeUpdate();
		DBconnector.disConnect(st, con);
		return result;
	}

	@Override
	public int update(BoardDTO boardDTO) throws Exception {
		Connection con=DBconnector.getConnect();
		String sql="update qna set title=?, contents=?, writer=? where num=?";
		PreparedStatement st=con.prepareStatement(sql);
		
		st.setString(1, boardDTO.getTitle());
		st.setString(2, boardDTO.getContents());
		st.setString(3, boardDTO.getWriter());
		st.setInt(4, boardDTO.getNum());
		
		int result=st.executeUpdate();
		DBconnector.disConnect(st, con);
		return result;
	}

	@Override
	public int delete(int num) throws Exception {
		Connection con=DBconnector.getConnect();
		String sql="delete qna where num=?";
		
		PreparedStatement st=con.prepareStatement(sql);
		st.setInt(1, num);
		int result=st.executeUpdate();
		
		DBconnector.disConnect(st, con);
		return result;
	}

	@Override
	public int getCount(Search search) throws Exception {
		Connection con=DBconnector.getConnect();
		String sql="select count(num) from qna";
		
		PreparedStatement st=con.prepareStatement(sql);
				
		ResultSet rs=st.executeQuery();
		rs.next();
		int result=rs.getInt(1);
		
		DBconnector.disConnect(rs, st, con);
		
		return result;
	}
	
	public int getNum() throws Exception{
		Connection con=DBconnector.getConnect();
		String sql="select notice_seq.nextval from dual";
		PreparedStatement st=con.prepareStatement(sql);
		ResultSet rs=st.executeQuery();
		rs.next();
		int num=rs.getInt(1);
		DBconnector.disConnect(rs, st, con);
		return num;
		
	}
	

}
