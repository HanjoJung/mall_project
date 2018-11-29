package com.nike.basket;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import com.nike.util.DBconnector;

public class BasketDAO {

	public int insert(BasketDTO basketDTO) throws Exception {
		Connection con = DBconnector.getConnect();
		String sql = "insert into basket values(basket_seq.nextval,?,?,?,?)";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, basketDTO.getId());
		st.setString(2, basketDTO.getProductCode());
		st.setString(3, basketDTO.getProductSize());
		st.setString(4, basketDTO.getCookie());
		int result = st.executeUpdate();
		DBconnector.disConnect(st, con);
		return result;
	}

	public List<BasketDTO> selectList(BasketDTO basketDTO) throws Exception {

		Connection con = DBconnector.getConnect();
		String sql = "select fname, productname, productcode, price, basket.productsize, num "
					+ "from basket "
					+ "INNER JOIN product using(productcode) " 
					+ "JOIN image using(productcode) "
					+ "where id = ? or cookie = ? "
					+ "order by num asc";

		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, basketDTO.getId());
		st.setString(2, basketDTO.getCookie());
		ResultSet rs = st.executeQuery();
		List<BasketDTO> ar = new ArrayList<>();
		while (rs.next()) {
			basketDTO = new BasketDTO();
			basketDTO.setFname(rs.getString("fname"));
			basketDTO.setProductName(rs.getString("productname"));
			basketDTO.setProductCode(rs.getString("productcode"));
			basketDTO.setPrice(rs.getInt("price"));
			basketDTO.setProductSize(rs.getString("productsize"));
			basketDTO.setNum(rs.getInt("num"));
			ar.add(basketDTO);
		}

		DBconnector.disConnect(rs, st, con);
		return ar;
	}
	
	public int delete(int num) throws Exception {

		Connection con = DBconnector.getConnect();
		String sql = "DELETE from basket where num=?";
		PreparedStatement st = con.prepareStatement(sql);
		st.setInt(1, num);
		int result = st.executeUpdate();
		DBconnector.disConnect(st, con);
		return result;

	}
	
	public int deleteall(String id) throws Exception {

		Connection con = DBconnector.getConnect();
		String sql = "DELETE from basket where id=?";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, id);
		int result = st.executeUpdate();
		DBconnector.disConnect(st, con);
		return result;

	}
}