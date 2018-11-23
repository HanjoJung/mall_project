package com.nike.basket;

import java.sql.Connection;
import java.sql.PreparedStatement;
import com.nike.util.DBconnector;

public class BasketDAO {

	public int insert(BasketDTO basketDTO) throws Exception {
		Connection con = DBconnector.getConnect();
		String sql = "insert into basket values(basket_seq.nextval,?,?)";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, basketDTO.getId());
		st.setString(2, basketDTO.getproductCode());
		int result = st.executeUpdate();
		DBconnector.disConnect(st, con);
		return result;
	}
}