package com.nike.review;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.nike.board.BoardDTO;
import com.nike.util.DBconnector;

public class ReviewDAO {

	public List<ReviewDTO> selectList(String code, int lastnum) throws Exception {
		Connection con = DBconnector.getConnect();
		String sql = "select * from " + 
				"(select rownum R, r.* from " + 
				"(select * from review " + 
				"where productcode = ? order by num desc) r) " + 
				"where R <= ?";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, code);
		st.setInt(2, lastnum);
		ResultSet rs = st.executeQuery();
		List<ReviewDTO> ar = new ArrayList<>();
		ReviewDTO reviewDTO = null;
		while (rs.next()) {
			reviewDTO = new ReviewDTO();
			reviewDTO.setNum(rs.getInt("num"));
			reviewDTO.setProductcode(rs.getString("productcode"));
			reviewDTO.setTitle(rs.getString("title"));
			reviewDTO.setContents(rs.getString("contents"));
			reviewDTO.setScore(rs.getInt("score"));
			reviewDTO.setWriter(rs.getString("writer"));
			reviewDTO.setReg_date(rs.getDate("reg_date"));
			ar.add(reviewDTO);
		}
		DBconnector.disConnect(rs, st, con);
		return ar;
	}

	public ReviewDTO selectOne(int num) throws Exception {
		Connection con = DBconnector.getConnect();
		String sql = "select * from review where num=?";
		PreparedStatement st = con.prepareStatement(sql);
		st.setInt(1, num);
		ReviewDTO reviewDTO = null;
		ResultSet rs = st.executeQuery();

		if (rs.next()) {
			reviewDTO = new ReviewDTO();
			reviewDTO.setNum(rs.getInt("num"));
			reviewDTO.setProductcode(rs.getString("productcode"));
			reviewDTO.setTitle(rs.getString("title"));
			reviewDTO.setContents(rs.getString("contents"));
			reviewDTO.setScore(rs.getInt("score"));
			reviewDTO.setWriter(rs.getString("writer"));
			reviewDTO.setReg_date(rs.getDate("reg_date"));
		}
		DBconnector.disConnect(rs, st, con);
		return reviewDTO;
	}

	public int insert(ReviewDTO reviewDTO) throws Exception {
		Connection con = DBconnector.getConnect();
		String sql = "insert into review values(review_seq.nextval,?,?,?,?,?,sysdate)";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, reviewDTO.getProductcode());
		st.setString(2, reviewDTO.getTitle());
		st.setString(3, reviewDTO.getContents());
		st.setInt(4, reviewDTO.getScore());
		st.setString(5, reviewDTO.getWriter());

		int result = st.executeUpdate();
		DBconnector.disConnect(st, con);
		return result;
	}

	public int update(BoardDTO boardDTO) throws Exception {
		Connection con = DBconnector.getConnect();
		String sql = "update review set productcode=?, contents=? where num=?";
		PreparedStatement st = con.prepareStatement(sql);
		ReviewDTO reviewDTO = new ReviewDTO();
		st.setString(1, reviewDTO.getProductcode());
		st.setString(2, reviewDTO.getContents());
		st.setInt(3, reviewDTO.getNum());

		int result = st.executeUpdate();
		DBconnector.disConnect(st, con);

		return result;
	}

	public int delete(int num) throws Exception {
		Connection con = DBconnector.getConnect();
		String sql = "delete review where num=?";
		PreparedStatement st = con.prepareStatement(sql);
		st.setInt(1, num);

		int result = st.executeUpdate();
		DBconnector.disConnect(st, con);

		return result;
	}
}