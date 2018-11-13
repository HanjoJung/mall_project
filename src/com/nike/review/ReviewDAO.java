package com.nike.review;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.nike.board.BoardDAO;
import com.nike.board.BoardDTO;
import com.nike.page.RowNumber;
import com.nike.page.Search;
import com.nike.util.DBconnector;

public class ReviewDAO implements BoardDAO{
	
	@Override
	public List<BoardDTO> selectList(RowNumber rowNumber) throws Exception {
		Connection con=DBconnector.getConnect();
		String sql="select * from review";
		PreparedStatement st=con.prepareStatement(sql);
		ResultSet rs=st.executeQuery();
		List<BoardDTO> ar=new ArrayList<>();
		ReviewDTO reviewDTO=null;
		while(rs.next()) {
			reviewDTO=new ReviewDTO();
			reviewDTO.setNum(rs.getInt("num"));
			reviewDTO.setProductcode(rs.getString("productcode"));
			reviewDTO.setContents(rs.getString("contents"));
			reviewDTO.setScore(rs.getInt("score"));
			reviewDTO.setWriter(rs.getString("writer"));
			reviewDTO.setReg_date(rs.getDate("reg_date"));
			ar.add(reviewDTO);
		}
		DBconnector.disConnect(rs, st, con);
		return ar;
	}

	@Override
	public BoardDTO selectOne(int num) throws Exception {
		Connection con=DBconnector.getConnect();
		String sql="select * from review where num=?";
		PreparedStatement st=con.prepareStatement(sql);
		st.setInt(1, num);
		ReviewDTO reviewDTO=null;
		ResultSet rs=st.executeQuery();

		if(rs.next()) {
			reviewDTO=new ReviewDTO();
			reviewDTO.setNum(rs.getInt("num"));
			reviewDTO.setProductcode(rs.getString("productcode"));
			reviewDTO.setContents(rs.getString("contents"));
			reviewDTO.setScore(rs.getInt("score"));
			reviewDTO.setWriter(rs.getString("writer"));
			reviewDTO.setReg_date(rs.getDate("reg_date"));
		}
		DBconnector.disConnect(rs, st, con);
		return reviewDTO;
	}

	@Override
	public int insert(BoardDTO boardDTO) throws Exception {
		Connection con=DBconnector.getConnect();
		String sql="insert into notice values(?,?,?,?,?,sysdate)";
		PreparedStatement st=con.prepareStatement(sql);
		ReviewDTO reviewDTO = new ReviewDTO();
		st.setInt(1, reviewDTO.getNum());
		st.setString(2, reviewDTO.getProductcode());
		st.setString(3, reviewDTO.getContents());
		st.setInt(4, reviewDTO.getScore());
		st.setString(5, reviewDTO.getWriter());
		
		int result=st.executeUpdate();
		DBconnector.disConnect(st, con);
		return result;
	}

	@Override
	public int update(BoardDTO boardDTO) throws Exception {
		Connection con=DBconnector.getConnect();
		String sql="update review set productcode=?, contents=? where num=?";
		PreparedStatement st=con.prepareStatement(sql);
		ReviewDTO reviewDTO = new ReviewDTO();
		st.setString(1, reviewDTO.getProductcode());
		st.setString(2, reviewDTO.getContents());
		st.setInt(3, reviewDTO.getNum());
		
		int result=st.executeUpdate();
		DBconnector.disConnect(st, con);
		
		return result;
	}

	@Override
	public int delete(int num) throws Exception {
		Connection con=DBconnector.getConnect();
		String sql="delete review where num=?";
		PreparedStatement st=con.prepareStatement(sql);
		st.setInt(1, num);
		
		int result=st.executeUpdate();
		DBconnector.disConnect(st, con);
		
		return result;
	}

	@Override
	public int getCount(Search search) throws Exception {
		Connection con=DBconnector.getConnect();
		String sql="select count(num) from review";
		PreparedStatement st=con.prepareStatement(sql);
		
		ResultSet rs=st.executeQuery();
		rs.next();
		int result=rs.getInt(1);
		
		DBconnector.disConnect(rs, st, con);
		return result;
	}

	public int getNum() throws Exception {
		Connection con = DBconnector.getConnect();
		String sql="select review_seq.nextval from dual";
		PreparedStatement st = con.prepareStatement(sql);
		ResultSet rs = st.executeQuery();
		rs.next();
		int num = rs.getInt(1);
		DBconnector.disConnect(rs, st, con);
		return num;

	}
}